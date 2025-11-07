import { Component } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';

@Component({
  selector: 'app-cursos-todos',
  templateUrl: './cursos-todos.component.html',
})
export class CursosTodosComponent {
  cursosNinos: Curso[] = [];
  cursosJovenes: Curso[] = [];
  cursosPadres: Curso[] = [];

}
