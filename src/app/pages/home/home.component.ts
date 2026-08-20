import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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

  scrollLeft(): void {
    if (this.sliderContainer) {
      this.sliderContainer.nativeElement.scrollBy({
        left: -300,
        left: -288,
        behavior: 'smooth',
      });
    }
  }

  scrollRight(): void {
    if (this.sliderContainer) {
      this.sliderContainer.nativeElement.scrollBy({
        left: 300,
        left: 288,
        behavior: 'smooth',
      });
    }
  }
}
