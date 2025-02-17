import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { CursoManagment } from 'src/app/core/class/managment/managment';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';
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
  cursos: CursoManagment[] = [];
  curso: CursoManagment = new CursoManagment();
  cursoAEliminar: CursoManagment | null = null;

  buscarCursoForm:FormGroup

  categorias = [
    { id: '6708179439154cb23c3150ca', nombre: 'Padres' },
    { id: '670aa5b834951486809e8fa1', nombre: 'Niños' }
  ];
  
  planetas = [
    { id: '6792877e2942e670016454de', nombre: 'Luminara' },
    { id: '6792d890005fc1e6836977f1', nombre: 'Planeta 2' },
    { id: '6792d8aa005fc1e6836977f2', nombre: 'Planeta 3' },
    { id: '6792d8bd005fc1e6836977f3', nombre: 'Planeta 4' }
  ];

  constructor(
    private fb:FormBuilder,
    private cursosService: CursosManagmentService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos() {
    this.isLoading = true;
    this.subscription.add(
      this.cursosService.listarCursosService$().subscribe({
        next: (data) => {
          this.cursos = data.map(curso => ({
            ...curso,
            categoriaNombre: this.getNombreCategoriaPorId(curso.categoriaId),
            planetaNombre: this.getNombrePlanetaPorId(curso.planetaId)
          }));
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al obtener cursos:', error);
          this.isLoading = false;
        }
      })
    );
  }

  getNombreCategoriaPorId(id: string): string {
    const categoria = this.categorias.find(cat => cat.id === id);
    return categoria ? categoria.nombre : 'Categoría no encontrada';
  }
  
  getNombrePlanetaPorId(id: string): string {
    const planeta = this.planetas.find(plan => plan.id === id);
    return planeta ? planeta.nombre : 'Planeta no encontrado';
  }

  showNuevoCurso(event?:boolean) {
    if(event != undefined){
      this.isNuevoCurso = event;
      this.listarCursos();
      return
    }

    this.isNuevoCurso = !this.isNuevoCurso;
  }
  
  buscarCurso(){}

  editarCurso(curso:any){}


  confirmarEliminacion(curso:any){
    this.cursoAEliminar = curso;

    this.confirmationService.confirm({
      message: `¿Seguro que quieres eliminar el curso "${curso.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-trash',
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
