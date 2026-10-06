import { IMenu } from '../../interfaces/interfaces';

export const C_MENU_CLIENTE_I: IMenu[] = [
  {
    idMenu: 1,
    nombre: 'MIS DATOS',
    idPadre: 0,
    items: [
      {
        padre: {
          idMenu: 1,
          nombre: 'MIS DATOS',
          idPadre: 0,
        },
        idMenu: 1,
        nombre: 'Mi Informacion',
        ruta: '/perfil/mi-informacion',
        idPadre: 0,
        icono: 'pi pi-exclamation-triangle',
      },
      {
        padre: { idMenu: 1, nombre: 'MIS DATOS', idPadre: 0 },
        idMenu: 2,
        nombre: 'Perfiles Asociados',
        ruta: '/perfil/perfiles-asociados',
        idPadre: 0,
        icono: 'pi pi-users',
      },
      {
        padre: { idMenu: 1, nombre: 'MIS DATOS', idPadre: 0 },
        idMenu: 3,
        nombre: 'Ver Historial',
        ruta: '/perfil/historial',
        idPadre: 0,
        icono: 'pi pi-history',
      },
      {
        padre: { idMenu: 1, nombre: 'MIS DATOS', idPadre: 0 },
        idMenu: 4,
        nombre: 'Notificaciones',
        ruta: '/perfil/notificaciones',
        idPadre: 0,
        icono: 'pi pi-bell',
      },
      {
        padre: { idMenu: 1, nombre: 'MIS DATOS', idPadre: 0 },
        idMenu: 5,
        nombre: 'Tarjetas Asociadas',
        ruta: '/perfil/tarjetas-asociadas',
        idPadre: 0,
        icono: 'pi pi-credit-card',
      },
      {
        padre: { idMenu: 1, nombre: 'MIS DATOS', idPadre: 0 },
        idMenu: 6,
        nombre: 'Mi Facturación',
        ruta: '/perfil/mi-facturacion',
        idPadre: 0,
        icono: 'pi pi-file',
      },
    ],
  },
];