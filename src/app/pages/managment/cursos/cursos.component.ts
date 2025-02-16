import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { CursoManagment } from 'src/app/core/class/managment/managment';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';

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
    private cursosService: CursosManagmentService
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


  eliminarCurso(curso:any){}

  clear(table:Table){
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
