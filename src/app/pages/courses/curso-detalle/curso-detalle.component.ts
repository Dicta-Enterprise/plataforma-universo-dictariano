import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { CCURSO_CONSTANT } from 'src/app/core/constants/courses/CCurso.constant';

// (puedes importar tu servicio si más adelante quieres cargarlo de backend)

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html'
})
export class CursoDetalleComponent implements OnInit {
  curso: Curso | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // Aquí buscarías el curso en tu store, constante, o más adelante usando un servicio
    this.curso = CCURSO_CONSTANT.find(c => c.id === Number(id));
  }
   agregarAlCarrito() {
    // Aquí llamas a tu servicio de carrito, o muestras un mensaje.
    alert('¡Curso agregado al carrito!');
  }

  comprarAhora() {
    // Aquí podrías redirigir a la página de pago, o mostrar una confirmación.
    alert('¡Compra inmediata iniciada!');
  }
}
