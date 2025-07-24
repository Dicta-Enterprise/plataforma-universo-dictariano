import { Component, Input } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';

@Component({
  selector: 'app-card-curso',
  templateUrl: './card-curso.component.html'
})
export class CardCursoComponent {
  @Input() curso!: Curso;
}

