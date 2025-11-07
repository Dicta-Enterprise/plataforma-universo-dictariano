import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CursoManagment } from 'src/app/core/class/managment/cursos/Cursos-managment.class';
import { CursoFacade } from 'src/app/shared/patterns/facade/managment/curso-facade';

// (puedes importar tu servicio si más adelante quieres cargarlo de backend)

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html'
})
export class CursoDetalleComponent implements OnInit {
  curso: Curso | undefined;
  cursos: CursoManagment[] = [];
  cursos$ = this.cursoFacade.cursos$;

  cursos_observable = this.cursos$.asObservable();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cart: CartService, private readonly cursoFacade:CursoFacade) {
    
    this.cursos_observable.subscribe(value => {
      const id = this.route.snapshot.paramMap.get('id');
      
      this.cursos = value;
      this.curso = value.find(c => c.id.toString() == id);
    });
  }


  ngOnInit() {
    this.cursoFacade.listarCursos(); 
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
