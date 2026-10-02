import { Component } from '@angular/core';
import { Cursos } from 'src/app/core/class/models';

@Component({
  selector: 'app-cursos-todos',
  templateUrl: './cursos-todos.component.html',
})
export class CursosTodosComponent {
  cursosNinos: Cursos[] = [];
  cursosJovenes: Cursos[] = [];
  cursosPadres: Cursos[] = [];
}
