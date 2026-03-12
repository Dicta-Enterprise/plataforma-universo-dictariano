import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { map, Subscription, finalize, Observable, catchError, of, forkJoin } from 'rxjs';
import { Cursos } from 'src/app/core/class/models';
import { CCATEGORIES_CONSTANT, CPLANETS_CONSTANT } from 'src/app/core/constants/constants';
import { CategoriaService } from 'src/app/core/services/models/categoria/categoria.service';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';
import { PlanetasService } from 'src/app/core/services/models/planetas/planetas.service';
import { Estandar } from 'src/app/shared/class/Estandar';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent  implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  isNuevoCurso: boolean = false;
  cursos: Cursos[] = [];
  curso: Cursos = new Cursos();
  cursoAEliminar: Cursos | null = null;

  buscarCursoForm:FormGroup

  categoriasMap: Map<string, string> = new Map();
  planetasMap: Map<string, string> = new Map();

  categoriasFiltro: { label: string; value: string }[] = [];
  planetasFiltro: { label: string; value: string }[] = [];

  selectedCategoria: string | null = null; 
  selectedPlaneta: string | null = null;
  
  constructor(
    private fb:FormBuilder,
    private readonly cursosService: CursosService,
    private readonly confirmationService: ConfirmationService,
    private readonly alertService: AlertService,
    private readonly categoriaManagmentService: CategoriaService,
    private readonly planetaManagmentService: PlanetasService,
  ) { }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    this.subscription.add(
      forkJoin({
        categorias: this.categoriaManagmentService.listarCategoriasService$(),
        planetas: this.planetaManagmentService.listarPlanetasService$()
      }).subscribe({
        next: ({ categorias, planetas }) => {
          this.categoriasMap = new Map(categorias.map(c => [c.id, c.nombre]));
          this.planetasMap = new Map(planetas.map(p => [p.id, p.nombre]));

          // Convertimos los mapas a listas de objetos { label, value } para el filtro
          this.categoriasFiltro = categorias.map(c => ({ label: c.nombre, value: c.id }));
          this.planetasFiltro = planetas.map(p => ({ label: p.nombre, value: p.id }));
          this.listarCursos();
        },
        error: () => {
          this.alertService.showError('Error', 'No se pudieron cargar las categorías o los planetas');
        }
      })
    );
  }

  listarCursos() {
    this.isLoading = true;
    this.subscription.add(
      this.cursosService.listarCursosService$()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data) => {
          this.cursos = data;
          console.log('Cursos ',this.cursos);
        },
        error: (error) => {
          this.alertService.showError(
            'Upss..',
            'Ocurrio un error al listar de los cursos'
          );
        }
      })
    );
  }

  getNombreCategoriaPorId(id: string): string {
    return this.categoriasMap.get(id) || 'Categoría no encontrada';
  }
  
  getNombrePlanetaPorId(id: string): string {
    return this.planetasMap.get(id) || 'Planeta no encontrado'
  }

  // filtrarCursos(table: Table) {
  //   table.clear();
    
  //   if (this.selectedCategoria) {
  //     table.filter(this.selectedCategoria, 'categoriaId', 'equals');
  //   }
    
  //   if (this.selectedPlaneta) {
  //     table.filter(this.selectedPlaneta, 'planetaId', 'equals');
  //   }
  // }
  
  // filtrarPorCategoria(categoriaId: string | null, table: Table) {
  //   this.selectedCategoria = categoriaId;
  //   this.filtrarCursos(table);
  // }
  
  // filtrarPorPlaneta(planetaId: string | null, table: Table) {
  //   this.selectedPlaneta = planetaId;
  //   this.filtrarCursos(table);
  // }

  showNuevoCurso(event?:boolean) {
    if(event != undefined){
      this.isNuevoCurso = event;
      this.curso = new Cursos();  
      return
    }

    this.isNuevoCurso = !this.isNuevoCurso;
  }
  
  buscarCurso(){}

  editarCurso(curso:Cursos){
    this.curso = {... curso};
    this.showNuevoCurso();
  }


  confirmarEliminacion(curso:Cursos){
    this.cursoAEliminar = curso;

    this.confirmationService.confirm({
      message: `¿Seguro que quieres eliminar el curso "${curso.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-trash',
      rejectButtonStyleClass: 'p-button-danger',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.eliminarCurso();
      },
      reject: () => {
        this.alertService.showInfo('Eliminación cancelada', 'No se eliminó el curso');
        this.cursoAEliminar = null; 
      }
    });
  }

  eliminarCurso() {
    if (!this.cursoAEliminar) return;

    this.cursosService.eliminarCursoService$(this.cursoAEliminar.id).subscribe({
      next: () => {
        this.alertService.showSuccess('Curso eliminado', `El curso ha sido eliminado correctamente`);
        this.listarCursos();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        const mensaje = err.error?.message || 'Ocurrió un error al eliminar el curso';
        this.alertService.showError('Error', mensaje);
      }
    });

    this.cursoAEliminar = null;
  }

  clear(table:Table){
    table.clear();
    this.selectedCategoria = null;
    this.selectedPlaneta = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
