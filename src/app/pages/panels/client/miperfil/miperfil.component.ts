import { Component } from '@angular/core';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent {
  menuItems = [
    { label: 'Mi perfil', link:'/miperfil' },
    { label: 'Mis cursos', link:'/cursos'},
    { label: 'Perfiles', link:'/perfiles' },
    { label: 'Configuración', link:'/configuracion' },
    { label: 'Cerrar sesión', link:'/cursos' }
  ];
}
