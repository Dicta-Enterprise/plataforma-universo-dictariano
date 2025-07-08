import { Component, Input } from '@angular/core';
import { Curso } from 'src/app/shared/data/cursosData';

@Component({
  selector: 'app-card-curso',
  templateUrl: './card-curso.component.html'
})
export class CardCursoComponent {
  @Input() curso!: Curso;
}

