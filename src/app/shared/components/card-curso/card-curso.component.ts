import { Component, Input } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-curso',
  templateUrl: './card-curso.component.html'
})

export class CardCursoComponent {
  @Input() curso!: Curso;

constructor(private router: Router) {}

  irADetalle() {
    // Solo navega si el curso existe y tiene id
    if (this.curso && this.curso.id) {
      this.router.navigate(['/courses/detalle', this.curso.id]);
    }
  }
}
