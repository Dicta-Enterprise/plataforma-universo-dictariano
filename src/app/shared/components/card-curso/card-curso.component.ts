import { Component, Input } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-card-curso',
  templateUrl: './card-curso.component.html',
  styleUrls: ['./card-curso.component.css']
})

export class CardCursoComponent {
  @Input() curso!: Curso;

constructor(
  private router: Router,
  private cart: CartService
  ) {}

  private glowByCat: Partial<Record<Curso['categoria'], string>> = {
  ninos:   '#f59e0b',
  jovenes: '#34d399',
  padres:  '#04d6f1ff'
};

  get glowColor(): string {
  const cat = this.curso?.categoria as keyof typeof this.glowByCat;
  return this.glowByCat[cat] ?? '#22d3ee';
}

  irADetalle() {
    // Solo navega si el curso existe y tiene id
    if (this.curso && this.curso.id) {
      this.router.navigate(['/courses/detalle', this.curso.id]);
    }
  }
  agregarAlCarrito() {
    this.cart.addToCart(this.curso);
    // Opcional: notificación o feedback
  }
}
