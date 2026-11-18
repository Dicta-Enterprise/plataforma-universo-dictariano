import { Component } from '@angular/core';

interface Curso {
  id: number;
  titulo: string;
  imagen: string;
  nombre: string;
  progreso: number;
}

type CursosPorTab = Record<string, Curso[]>;

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css'],
})
export class MisCursosComponent {
  activeTab = 'mi-cuenta';

  cursosData: CursosPorTab = {
    'mi-cuenta': [
      {
        id: 1,
        titulo: 'Crianza digital',
        imagen:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80',
        nombre: 'TOTIS',
        progreso: 75,
      },
      {
        id: 2,
        titulo: 'Grooming protector',
        imagen:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
        nombre: 'TOTIS',
        progreso: 40,
      },
      {
        id: 3,
        titulo: 'Descuido digital',
        imagen:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80',
        nombre: 'TOTIS',
        progreso: 100,
      },
    ],
    joven: [
      {
        id: 4,
        titulo: 'Seguridad en Redes Sociales',
        imagen:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
        nombre: 'JOVEN',
        progreso: 20,
      },
    ],
    nino: [
      {
        id: 5,
        titulo: 'Aventuras en Internet Seguro',
        imagen:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80',
        nombre: 'NIÑO',
        progreso: 10,
      },
    ],
  };

  get cursosActuales(): Curso[] {
    return this.cursosData[this.activeTab] || [];
  }

  get rellenosCards(): number[] {
    const resto = this.cursosActuales.length % 3;
    if (resto === 0) return [];
    const cantidadFaltantes = 3 - resto;
    return Array(cantidadFaltantes).fill(0);
  }
}
