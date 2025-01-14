import { IMenu } from '../../interfaces/interfaces';

export const C_MENU_MANAGMENT_I: IMenu[] = [
  {
    idMenu: 1,
    nombre: 'MANTENEDORES',
    idPadre: 0,
    items: [
      {
        padre: {
          idMenu: 1,
          nombre: 'MANTENEDORES',
          idPadre: 0,
        },
        idMenu: 1,
        nombre: 'Cursos',
        ruta: '/managment/cursos',
        idPadre: 0,
        icono: 'pi pi-exclamation-triangle',
      },
      {
        padre: {
          idMenu: 1,
          nombre: 'MANTENEDORES',
          idPadre: 0,
        },
        idMenu: 2,
        nombre: 'Galaxias',
        ruta: '/managment/galaxias',
        idPadre: 0,
        icono: 'pi pi-exclamation-triangle',
      },
      {
        padre: {
          idMenu: 1,
          nombre: 'MANTENEDORES',
          idPadre: 0,
        },
        idMenu: 3,
        nombre: 'Planetas',
        ruta: '/managment/planetas',
        idPadre: 0,
        icono: 'pi pi-exclamation-triangle',
      },
      {
        padre: {
          idMenu: 1,
          nombre: 'MANTENEDORES',
          idPadre: 0,
        },
        idMenu: 4,
        nombre: 'Categorias',
        ruta: '/managment/categoria',
        idPadre: 0,
        icono: 'pi pi-exclamation-triangle',
      },
    ],
  },

  {
    idMenu: 2,
    nombre: 'USUARIOS',
    idPadre: 0,
    items: [
      {
        padre: {
          idMenu: 2,
          nombre: 'USUARIOS',
          idPadre: 0,
        },
        idMenu: 4,
        nombre: 'Todos los Usuarios',
        ruta: '/managment/users',
        idPadre: 0,
        icono: 'pi pi-exclamation-triangle',
      },
      {
        padre: {
          idMenu: 2,
          nombre: 'USUARIOS',
          idPadre: 0,
        },
        idMenu: 5,
        nombre: 'Grafico de Usuarios',
        idPadre: 0,
        icono: 'pi pi-exclamation-triangle',
      },
    ],
  },
];
