import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Cursos } from 'src/app/core/class/models/cursos/Cursos.class';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
})
export class CursoDetalleComponent implements OnInit {
  curso: Cursos | undefined;
  agregado = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cart: CartService,
    private readonly cursoFacade: CursoFacade,
  ) {}

  ngOnInit(): void {
    this.cursoFacade.listarCursos();

    // 2. Nos suscribimos en ngOnInit
    this.cursoFacade.cursos$.subscribe((listaCursos) => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.curso = listaCursos.find((c) => c.id.toString() === id);
      }
    });
  }

  agregarAlCarrito(): void {
    if (!this.curso) return;
    this.cart.addToCart(this.curso);
    this.agregado = true;
  }

  comprarAhora(): void {
    this.router.navigate(['/cart']);
  }
}
