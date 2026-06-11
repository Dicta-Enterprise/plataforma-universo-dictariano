import { Component } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent {
filtroActivo = 'todos';

  filtros = [
    { label: 'Todos', value: 'todos' },
    { label: 'Padres', value: 'padres' },
    { label: 'Niños', value: 'ninos' },
    { label: 'Jóvenes', value: 'jovenes' },
    { label: 'Recientes', value: 'recientes' },
  ];

  cursos: (Curso & { fechaCompra: Date })[] = [
    { ...new Curso({ id: 1, nombre: 'Seguridad en Internet', descripcion: 'Desc', categoria: 'ninos', imagen: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400', precio: 100000, rating: 5 }), fechaCompra: new Date('2026-06-07') },
    { ...new Curso({ id: 2, nombre: 'Seguridad en Internet', descripcion: 'Desc', categoria: 'ninos', imagen: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400', precio: 100000, rating: 5 }), fechaCompra: new Date('2026-06-05') },
    { ...new Curso({ id: 3, nombre: 'Seguridad en Internet', descripcion: 'Desc', categoria: 'jovenes', imagen: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400', precio: 100000, rating: 5 }), fechaCompra: new Date('2026-06-08') },
    { ...new Curso({ id: 4, nombre: 'Seguridad en Internet', descripcion: 'Desc', categoria: 'jovenes', imagen: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400', precio: 100000, rating: 5 }), fechaCompra: new Date('2026-06-01') },
    { ...new Curso({ id: 5, nombre: 'Seguridad en Internet', descripcion: 'Desc', categoria: 'padres', imagen: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400', precio: 100000, rating: 5 }), fechaCompra: new Date('2026-06-03') },
    { ...new Curso({ id: 6, nombre: 'Seguridad en Internet', descripcion: 'Desc', categoria: 'padres', imagen: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400', precio: 100000, rating: 5 }), fechaCompra: new Date('2026-05-28') },
  ];

  getCursosPor(categoria: string): Curso[] {
    return this.cursos.filter(c => c.categoria === categoria);
  }
   getCursosRecientes(): Curso[] {
    return [...this.cursos]
      .sort((a, b) => b.fechaCompra.getTime() - a.fechaCompra.getTime())
      .slice(0, 4);
  }
}
