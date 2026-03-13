import { Item } from 'src/app/shared/class/Item.class';
import { Menu } from 'src/app/shared/class/Menu.class';

export const C_MENU_MANAGMENT: Menu[] = [

  new Menu({
    id: 1,
    nombre: 'Usuarios',
    items: [
      new Item({
        nombre: 'Todos los Usuarios',
        icono: 'pi pi-list',
        ruta: '/managment/users'
      }),
      new Item({
        nombre: 'Grafico de Usuarios',
        icono: 'pi pi-user-plus'
      })

    ]
  }),
  new Menu({
    id: 2,
    nombre: 'Roles',
    items: [
      new Item({
        nombre: 'Todos los Roles',
        icono: 'pi pi-list',
        ruta: '/managment/roles'
      }),
      new Item({
        nombre: 'Grafico de Roles',
        icono: 'pi pi-user-plus'
      })

    ]
  }),
  new Menu({
    id: 3,
    nombre: 'Permisos',
    items: [
      new Item({
        nombre: 'Todos los Permisos',
        icono: 'pi pi-list',
        ruta: '/managment/permissions'
      }),
      new Item({
        nombre: 'Grafico de Permisos',
        icono: 'pi pi-user-plus'
      })

    ]
  }),
  new Menu({
    id: 4,
    nombre: 'Mantenedores',
    items: [
      new Item({
        nombre: 'Cursos',
        icono: 'pi pi-list',
        ruta: '/managment/mantenedores',
        items: [
          new Item({
            nombre: 'Cursos',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/cursos'
          }),
          new Item({
            nombre: 'Categorias',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/categorias'
          }),
          new Item({
            nombre: 'Profesores',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/profesores'
          }),
          new Item({
            nombre: 'Alumnos',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/alumnos'
          }),
          new Item({
            nombre: 'Matriculas',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/matriculas'
          }),
          new Item({
            nombre: 'Pagos',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/pagos'
          }),
          new Item({
            nombre: 'Asistencias',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/asistencias'
          }),
          new Item({
            nombre: 'Notas',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/notas'
          }),
          new Item({
            nombre: 'Cursos',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/cursos'
          }),
          new Item({
            nombre: 'Categorias',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/categorias'
          }),
          new Item({
            nombre: 'Profesores',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/profesores'
          }),
          new Item({
            nombre: 'Alumnos',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/alumnos'
          }),
          new Item({
            nombre: 'Matriculas',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/matriculas'
          }),
          new Item({
            nombre: 'Pagos',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/pagos'
          })
        ]
      }),
      new Item({
        nombre: 'Galaxias',
        icono: 'pi pi-user-plus',
        items: [
          new Item({
            nombre: 'Todas las Galaxias',
            icono: 'pi pi-list',
            ruta: '/managment/mantenedores/galaxias'
          }),
          // new Item({
          //   nombre: 'Planetas',
          //   icono: 'pi pi-list',
          //   ruta: '/managment/mantenedores/planetas'
          // }),
          // new Item({
          //   nombre: 'Clientes',
          //   icono: 'pi pi-list',
          //   ruta: '/managment/mantenedores/clientes'
          // })
        ]
      }),
      new Item({
        nombre: 'Planetas',
        icono: 'pi pi-user-plus'
      }),
      new Item({
        nombre: 'Clientes',
        icono: 'pi pi-user-plus'
      })

    ]
  })

];
