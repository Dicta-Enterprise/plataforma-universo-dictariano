import { Curso } from 'src/app/core/class/curso/curso.class';
export const CursosData: Curso[] = [];
/*
export const CursosData: Curso[] = [
  {
    id: 1,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'ninos',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 2,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'jovenes',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 3,
    precio: 99.00,
    nombre: 'Parentalidad Digital Responsable',
    descripcion: 'Guía para que los padres entiendan los riesgos y cómo actuar.',
    categoria: 'padres',
    beneficios: [
      'Psicología del pederasta',
      'Función parental digital',
      'Técnicas para prevenir el grooming',
      'Cómo enfrentar a pederastas'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png'
  },
  {
    id: 4,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'ninos',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 5,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'ninos',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 6,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'jovenes',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 7,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'padres',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 8,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'jovenes',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 9,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'jovenes',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 10,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'jovenes',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 11,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'jovenes',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 12,
    precio: 99.00,
    nombre: 'Parentalidad Digital Responsable',
    descripcion: 'Guía para que los padres entiendan los riesgos y cómo actuar.',
    categoria: 'jovenes',
    beneficios: [
      'Psicología del pederasta',
      'Función parental digital',
      'Técnicas para prevenir el grooming',
      'Cómo enfrentar a pederastas'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png'
  },
  {
    id: 13,
    precio: 99.00,
    nombre: 'Parentalidad Digital Responsable',
    descripcion: 'Guía para que los padres entiendan los riesgos y cómo actuar.',
    categoria: 'jovenes',
    beneficios: [
      'Psicología del pederasta',
      'Función parental digital',
      'Técnicas para prevenir el grooming',
      'Cómo enfrentar a pederastas'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png'
  },
  {
    id: 14,
    precio: 99.00,
    nombre: 'Parentalidad Digital Responsable',
    descripcion: 'Guía para que los padres entiendan los riesgos y cómo actuar.',
    categoria: 'jovenes',
    beneficios: [
      'Psicología del pederasta',
      'Función parental digital',
      'Técnicas para prevenir el grooming',
      'Cómo enfrentar a pederastas'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png'
  },
  {
    id: 15,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'padres',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 16,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'padres',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 17,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'padres',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 18,
    precio: 99.00,
    nombre: 'Protección Infantil Digital',
    descripcion: 'Ayuda a tu hijo a identificar situaciones de riesgo en internet.',
    categoria: 'padres',
    beneficios: [
      'Reconocer propuestas negativas',
      'Cómo enfrentar el grooming',
      'Desarrollo de resolución de problemas',
      'Comunicación abierta con padres'
    ],
    imagen: '/assets/img/niñocelular.png'
  },
  {
    id: 19,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'ninos',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 20,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'ninos',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 21,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'ninos',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 22,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'ninos',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },
  {
    id: 23,
    precio: 99.00,
    nombre: 'Prevención de Grooming en Adolescentes',
    descripcion: 'Herramientas para adolescentes para protegerse en redes sociales.',
    categoria: 'ninos',
    beneficios: [
      'Confianza personal',
      'Pensamiento crítico',
      'Autoprotección en internet',
      'Uso consciente de herramientas digitales'
    ],
    imagen: 'https://cdn-icons-png.flaticon.com/512/3048/3048394.png'
  },


  
];
*/