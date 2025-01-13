import { IMenu } from '../../interfaces/interfaces';

// {
//     items: [
//       {
//         padre: {
//           idMenu: 1,
//           nombre: 'OPERACIONES',
//           idPadre: 0,
//         },
//         idMenu: 3,
//         nombre: 'Nueva Orden',
//         ruta: '/dashboard/operaciones/nueva-orden',
//         idPadre: 1,
//         icono: 'pi pi-home',
//       },
//       {
//         padre: {
//           idMenu: 1,
//           nombre: 'OPERACIONES',
//           idPadre: 0,
//         },
//         items: [
//           {
//             padre: {
//               idMenu: 4,
//               nombre: 'Orden Servicio',
//               idPadre: 1,
//               icono: 'pi pi-list',
//             },
//             idMenu: 17,
//             nombre: 'Orden Individual',
//             ruta: '/dashboard/operaciones/orden-servicio/orden-individual',
//             idPadre: 4,
//             icono: 'pi pi-map',
//           },
//           {
//             padre: {
//               idMenu: 4,
//               nombre: 'Orden Servicio',
//               idPadre: 1,
//               icono: 'pi pi-list',
//             },
//             idMenu: 18,
//             nombre: 'Orden Masiva',
//             ruta: '/dashboard/operaciones/orden-servicio/orden-masiva',
//             idPadre: 4,
//             icono: 'pi pi-map',
//           },
//           {
//             padre: {
//               idMenu: 4,
//               nombre: 'Orden Servicio',
//               idPadre: 1,
//               icono: 'pi pi-list',
//             },
//             idMenu: 28,
//             nombre: 'Pago de Facturacion Masivo',
//             ruta: '/dashboard/operaciones/orden-servicio/pago-facturacion-masivo',
//             idPadre: 4,
//             icono: 'pi pi-map',
//           },
//         ],
//         idMenu: 4,
//         nombre: 'Orden Servicio',
//         idPadre: 1,
//         icono: 'pi pi-list',
//       },
//       {
//         padre: {
//           idMenu: 1,
//           nombre: 'OPERACIONES',
//           idPadre: 0,
//         },
//         idMenu: 5,
//         nombre: 'Guia Transportista',
//         ruta: '/dashboard/operaciones/guia-transportista',
//         idPadre: 1,
//         icono: 'pi pi-map',
//       },
//       {
//         padre: {
//           idMenu: 1,
//           nombre: 'OPERACIONES',
//           idPadre: 0,
//         },
//         items: [
//           {
//             padre: {
//               idMenu: 10,
//               nombre: 'Traslado',
//               idPadre: 1,
//               icono: 'pi pi-calendar',
//             },
//             idMenu: 12,
//             nombre: 'Programaciones',
//             ruta: '/dashboard/operaciones/traslado/programaciones',
//             idPadre: 10,
//             icono: 'pi pi-times',
//           },
//           {
//             padre: {
//               idMenu: 10,
//               nombre: 'Traslado',
//               idPadre: 1,
//               icono: 'pi pi-calendar',
//             },
//             idMenu: 13,
//             nombre: 'Embarque',
//             ruta: '/dashboard/operaciones/traslado/embarque',
//             idPadre: 10,
//             icono: 'pi pi-clock',
//           },
//           {
//             padre: {
//               idMenu: 10,
//               nombre: 'Traslado',
//               idPadre: 1,
//               icono: 'pi pi-calendar',
//             },
//             idMenu: 14,
//             nombre: 'Manifiesto',
//             ruta: '/dashboard/operaciones/traslado/manifiesto',
//             idPadre: 10,
//             icono: 'pi pi-times',
//           },
//           {
//             padre: {
//               idMenu: 10,
//               nombre: 'Traslado',
//               idPadre: 1,
//               icono: 'pi pi-calendar',
//             },
//             idMenu: 15,
//             nombre: 'Trayectoria',
//             ruta: '/dashboard/operaciones/traslado/trayectoria',
//             idPadre: 10,
//             icono: 'pi pi-map',
//           },
//         ],
//         idMenu: 10,
//         nombre: 'Traslado',
//         idPadre: 1,
//         icono: 'pi pi-calendar',
//       },
//       {
//         padre: {
//           idMenu: 1,
//           nombre: 'OPERACIONES',
//           idPadre: 0,
//         },
//         idMenu: 11,
//         nombre: 'Cliente no Deseado',
//         ruta: '/dashboard/operaciones/cliente-no-deseado',
//         idPadre: 1,
//         icono: 'pi pi-exclamation-triangle',
//       },
//       {
//         padre: {
//           idMenu: 1,
//           nombre: 'OPERACIONES',
//           idPadre: 0,
//         },
//         idMenu: 16,
//         nombre: 'Objetos Comunes',
//         ruta: '/dashboard/operaciones/objetos-comunes',
//         idPadre: 1,
//         icono: 'pi pi-box',
//       },
//     ],
//     idMenu: 1,
//     nombre: 'OPERACIONES',
//     idPadre: 0,
//   },

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
    ],
  },
];
