import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { CCURSO_CONSTANT } from 'src/app/core/constants/courses/CCurso.constant';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';

// (puedes importar tu servicio si más adelante quieres cargarlo de backend)

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html'
})
export class CursoDetalleComponent implements OnInit {
  curso: Curso | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // Aquí buscarías el curso en tu store, constante, o más adelante usando un servicio
    this.curso = CCURSO_CONSTANT.find(c => c.id === Number(id));
  }
  
  agregado = false;

agregarAlCarrito() {
  if (!this.curso) return;
  this.cart.addToCart(this.curso);
  // Opcional: feedback
}

  comprarAhora() {
    // Aquí podrías redirigir a la página de pago, o mostrar una confirmación.
    this.router.navigate(['/cart']);
  }
}
