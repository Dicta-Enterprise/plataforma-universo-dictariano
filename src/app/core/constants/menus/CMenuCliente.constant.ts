import { Item } from 'src/app/shared/class/Item.class';
import { Menu } from 'src/app/shared/class/Menu.class';

export const C_MENU_CLIENTE: Menu[] = [
  new Menu({
    id: 1,
    nombre: 'DATOS GENERALES',
    icono: 'fa fa-users',
    items: [
      new Item({
        id: 1,
        nombre: 'Mi Informacion',
        ruta: '/perfil/mi-informacion',
        icono: 'pi pi-list',
      }),
      new Item({
        id: 2,
        nombre: 'Mis Direcciones',
        ruta: '/perfil/tarjetas-asociadas',
        icono: 'pi pi-list',
      }),

    ],
  }),
  new Menu({
    id: 2,
    nombre:'MI PORTAL',
    icono: 'fa fa-users',
    items:[
      new Item({
        id: 1,
        nombre: 'Mis Pedidos',
        ruta: '/perfil/mis-pedidos',
        icono: 'pi pi-list',
      }),
      new Item({
        id: 2,
        nombre: 'Mis Devoluciones',
        ruta: '/perfil/mis-devoluciones',
        icono: 'pi pi-list',
      }),
      new Item({
        id: 3,
        nombre: 'Mis Favoritos',
        ruta: '/perfil/mis-favoritos',
        icono: 'pi pi-list',
      }),
      new Item({
        id: 4,
        nombre: 'Mis Cursos',
        ruta: '/perfil/mis-notificaciones',
        icono: 'pi pi-list',
      }),
      new Item({
        id: 5,
        nombre: 'Mis Perfiles',
        ruta: '/perfil/mis-notificaciones',
        icono: 'pi pi-list',
      })
    ]

  }),
  new Menu({
    id: 3,
    nombre: 'CONFIGURACION',
    icono: 'fa fa-users',
    items:[
      new Item({
        id: 1,
        nombre: 'Cambiar Contraseña',
        ruta: '/perfil/cambiar-contrasena',
        icono: 'pi pi-list',
      }),
      new Item({
        id: 2,
        nombre: 'Notificaciones',
        ruta: '/perfil/mis-notificaciones',
        icono: 'pi pi-list',
      }),
      new Item({
        id: 3,
        nombre: 'Mis Tarjetas',
        ruta: '/perfil/tarjetas-asociadas',
        icono: 'pi pi-list',
      }),
    ]
  })
];
