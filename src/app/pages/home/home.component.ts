import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
  ) {}

  // Cusos para los carruceles
  // Cursos para los carruseles
  cursosDescuentos: Curso[] = [
    new Curso({
      id: 1,
      nombre: 'Postura y Ergonomía en el Trabajo',
      descripcion:
        'Aprende a ajustar tu espacio de trabajo para evitar dolores de espalda y fatiga corporal.',
      categoria: 'fisica',
      imagen:
        'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400',
      precio: 80000,
      rating: 5,
    }),
    new Curso({
      id: 2,
      nombre: 'Prevención de Fatiga Visual',
      descripcion:
        'Técnicas y ejercicios para proteger tu visión durante largas jornadas frente a la pantalla.',
      categoria: 'fisica',
      imagen: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400',
      precio: 90000,
      rating: 4,
    }),
    new Curso({
      id: 3,
      nombre: 'Pausas Activas y Estiramientos',
      descripcion:
        'Rutinas sencillas de 5 minutos para activar la circulación y liberar tensión muscular.',
      categoria: 'fisica',
      imagen:
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
      precio: 75000,
      rating: 5,
    }),
    new Curso({
      id: 4,
      nombre: 'Cuidado Articular y Movilidad',
      descripcion:
        'Prevención de lesiones repetitivas en muñecas, cuello y hombros para usuarios de PC.',
      categoria: 'fisica',
      imagen:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      precio: 85000,
      rating: 4,
    }),
    new Curso({
      id: 5,
      nombre: 'Hábitos Saludables para Escritorio',
      descripcion:
        'Guía integral de hidratación, iluminación adecuada y descansos para un trabajo constante.',
      categoria: 'fisica',
      imagen:
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400',
      precio: 95000,
      rating: 5,
    }),
    new Curso({
      id: 15,
      nombre: 'Ciudadanía y Ética Digital',
      descripcion:
        'Buenas prácticas para una convivencia sana y respetuosa en entornos virtuales.',
      categoria: 'ninos',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 90000,
      rating: 5,
    }),
    new Curso({
      id: 15,
      nombre: 'Ciudadanía y Ética Digital',
      descripcion:
        'Buenas prácticas para una convivencia sana y respetuosa en entornos virtuales.',
      categoria: 'ninos',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 90000,
      rating: 5,
    }),
  ];

  cursosNuevos: Curso[] = [
    new Curso({
      id: 6,
      nombre: 'Programación Básica e Introductoria',
      descripcion:
        'Fundamentos del pensamiento lógico y creación de tus primeros scripts prácticos.',
      categoria: 'digital',
      imagen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      precio: 120000,
      rating: 5,
    }),
    new Curso({
      id: 7,
      nombre: 'Uso Seguro de Redes Sociales',
      descripcion:
        'Aprende a gestionar perfiles digitales y proteger tus datos personales en la nube.',
      categoria: 'digital',
      imagen:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
      precio: 100000,
      rating: 4,
    }),
    new Curso({
      id: 8,
      nombre: 'Herramientas de Colaboración Cloud',
      descripcion:
        'Domina suites en la nube para trabajo en equipo, gestión de archivos y productividad.',
      categoria: 'digital',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 110000,
      rating: 5,
    }),
    new Curso({
      id: 9,
      nombre: 'Introducción a la Inteligencia Artificial',
      descripcion:
        'Uso ético y práctico de herramientas de IA para optimizar tareas cotidianas.',
      categoria: 'digital',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 130000,
      rating: 5,
    }),
    new Curso({
      id: 10,
      nombre: 'Creación de Contenido Digital',
      descripcion:
        'Diseño básico y edición para comunicar ideas de forma clara en plataformas web.',
      categoria: 'digital',
      imagen:
        'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=400',
      precio: 105000,
      rating: 4,
    }),
    new Curso({
      id: 15,
      nombre: 'Ciudadanía y Ética Digital',
      descripcion:
        'Buenas prácticas para una convivencia sana y respetuosa en entornos virtuales.',
      categoria: 'ninos',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 90000,
      rating: 5,
    }),
    new Curso({
      id: 15,
      nombre: 'Ciudadanía y Ética Digital',
      descripcion:
        'Buenas prácticas para una convivencia sana y respetuosa en entornos virtuales.',
      categoria: 'ninos',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 90000,
      rating: 5,
    }),
  ];

  cursosRecomendados: Curso[] = [
    new Curso({
      id: 11,
      nombre: 'Ciberseguridad para Niños',
      descripcion:
        'Aventura digital para enseñar a los más pequeños a navegar con seguridad.',
      categoria: 'ninos',
      imagen:
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
      precio: 110000,
      rating: 5,
    }),
    new Curso({
      id: 12,
      nombre: 'Privacidad e Identidad en la Web',
      descripcion:
        'Protección contra el huella digital, phishing y robo de datos para jóvenes.',
      categoria: 'jovenes',
      imagen:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      precio: 95000,
      rating: 4,
    }),
    new Curso({
      id: 13,
      nombre: 'Guía de Control Parental para Padres',
      descripcion:
        'Configuración de entornos digitales seguros para el acompañamiento familiar.',
      categoria: 'padres',
      imagen: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400',
      precio: 115000,
      rating: 5,
    }),
    new Curso({
      id: 14,
      nombre: 'Detención de Riesgos Digitales',
      descripcion:
        'Identificación temprana de fraudes, grooming y contenidos no aptos.',
      categoria: 'jovenes',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 100000,
      rating: 4,
    }),
    new Curso({
      id: 15,
      nombre: 'Ciudadanía y Ética Digital',
      descripcion:
        'Buenas prácticas para una convivencia sana y respetuosa en entornos virtuales.',
      categoria: 'ninos',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 90000,
      rating: 5,
    }),
    new Curso({
      id: 15,
      nombre: 'Ciudadanía y Ética Digital',
      descripcion:
        'Buenas prácticas para una convivencia sana y respetuosa en entornos virtuales.',
      categoria: 'ninos',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 90000,
      rating: 5,
    }),
    new Curso({
      id: 15,
      nombre: 'Ciudadanía y Ética Digital',
      descripcion:
        'Buenas prácticas para una convivencia sana y respetuosa en entornos virtuales.',
      categoria: 'ninos',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      precio: 90000,
      rating: 5,
    }),
  ];

  // Logica de seleccion de galaxias y tags
  galaxiasSeleccionadas: string[] = ['Peligros Digitales'];
  tagsSeleccionados: string[] = ['Niños', 'Jóvenes'];

  toggle(item: string, lista: string[]) {
    const index = lista.indexOf(item);
    if (index > -1) {
      lista.splice(index, 1);
    } else {
      lista.push(item);
    }
  }

  getChipClass(item: string, lista: string[]): string {
    const isSelected = lista.includes(item);
    return isSelected
      ? '!bg-white !text-black font-semibold !text-xs cursor-pointer'
      : '!bg-neutral-900 !text-gray-300 !text-xs font-semibold cursor-pointer hover:!bg-neutral-800';
  }

  // Logica de redireccion a seccion de cursos cuando se hace click en el boton de (+) de card de cuenta asociada
  @ViewChild('seccionCursos') seccionCursos!: ElementRef<HTMLElement>;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tagParam = params['tag'];

      if (tagParam) {
        this.tagsSeleccionados = [tagParam];
      }
    });
  }
  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'seccionCursos') {
        setTimeout(() => {
          if (this.seccionCursos) {
            this.seccionCursos.nativeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    });
  }
}
