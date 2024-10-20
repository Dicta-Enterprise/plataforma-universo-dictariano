import { IMenuReponsesDto } from '../../interfaces/interfaces';

export const MENU_CONSTANT: IMenuReponsesDto[] = [
  {
    id: '1',
    nombre: 'PLATAFORMA',
    icono: 'pi pi-chevron-down',
    color: 'primary',
    subMenu: [
      {
        id: '1.1',
        nombre: 'Usuarios',
        ruta: '/admin/usuarios',
        icono: 'pi pi-chevron-right',
        color: 'primary',
      },
      {
        id: '1.2',
        nombre: 'Roles',
        ruta: '/admin/roles',
        icono: 'pi pi-chevron-right',
        color: 'primary',
      },
      {
        id: '1.3',
        nombre: 'Permisos',
        ruta: '/admin/permisos',
        icono: 'pi pi-chevron-right',
        color: 'primary',
      },
    ],
  },
  {
    id: '2',
    nombre: 'CURSOS',
    icono: 'pi pi-chevron-down',
    color: 'primary',
    subMenu: [
      {
        id: '2.1',
        nombre: 'Cursos',
        ruta: '/admin/cursos',
        icono: 'pi pi-chevron-right',
        color: 'primary',
      },
      {
        id: '2.2',
        nombre: 'Categorias',
        ruta: '/admin/categorias',
        icono: 'pi pi-chevron-right',
        color: 'primary',
      },
    ],
  },
];
