import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  constructor(public auth: AuthService) {}
  // Cursos de prueba para mostrar en la sección mas cursos
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;

  cursos: (Curso & { fechaCompra: Date })[] = [
    {
      ...new Curso({
        id: 1,
        nombre: 'Seguridad en Internet',
        descripcion: 'Desc',
        categoria: 'ninos',
        imagen:
          'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
        precio: 100000,
        rating: 5,
      }),
      fechaCompra: new Date('2026-06-07'),
    },
    {
      ...new Curso({
        id: 2,
        nombre: 'Seguridad en Internet',
        descripcion: 'Desc',
        categoria: 'ninos',
        imagen:
          'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
        precio: 100000,
        rating: 5,
      }),
      fechaCompra: new Date('2026-06-05'),
    },
    {
      ...new Curso({
        id: 3,
        nombre: 'Seguridad en Internet',
        descripcion: 'Desc',
        categoria: 'jovenes',
        imagen:
          'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
        precio: 100000,
        rating: 5,
      }),
      fechaCompra: new Date('2026-06-08'),
    },
    {
      ...new Curso({
        id: 4,
        nombre: 'Seguridad en Internet',
        descripcion: 'Desc',
        categoria: 'jovenes',
        imagen:
          'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
        precio: 100000,
        rating: 5,
      }),
      fechaCompra: new Date('2026-06-01'),
    },
    {
      ...new Curso({
        id: 5,
        nombre: 'Seguridad en Internet',
        descripcion: 'Desc',
        categoria: 'padres',
        imagen:
          'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
        precio: 100000,
        rating: 5,
      }),
      fechaCompra: new Date('2026-06-03'),
    },
    {
      ...new Curso({
        id: 6,
        nombre: 'Seguridad en Internet',
        descripcion: 'Desc',
        categoria: 'padres',
        imagen:
          'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
        precio: 100000,
        rating: 5,
      }),
      fechaCompra: new Date('2026-05-28'),
    },
    {
      ...new Curso({
        id: 7,
        nombre: 'Seguridad en Internet',
        descripcion: 'Desc',
        categoria: 'padres',
        imagen:
          'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
        precio: 100000,
        rating: 5,
      }),
      fechaCompra: new Date('2026-05-28'),
    },
    {
      ...new Curso({
        id: 8,
        nombre: 'Seguridad en Internet',
        descripcion: 'Desc',
        categoria: 'padres',
        imagen:
          'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
        precio: 100000,
        rating: 5,
      }),
      fechaCompra: new Date('2026-05-28'),
    },
  ];

  scrollTo(isNext: boolean): void {
    if (!this.sliderContainer) return;

    const container = this.sliderContainer.nativeElement;
    const width = window.innerWidth;

    const offset = width >= 1024 ? 12 : 16;

    // Calculamos la distancia total a desplazar
    const scrollAmount = container.clientWidth - offset;

    container.scrollBy({
      left: isNext ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  }

  // Logica de redireccion a seccion de cursos cuando se hace click en el boton de (+) de card de cuenta asociada
  @ViewChild('seccionCursos') seccionCursos!: ElementRef<HTMLElement>;
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.seccionCursos) {
        this.seccionCursos.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  }
}
