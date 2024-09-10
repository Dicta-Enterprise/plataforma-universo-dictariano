
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
    items: MenuItem[] | undefined;

    menuItems = [
        { label: 'Mi perfil', link:'/miperfil' },
        { label: 'Mis cursos', link:'/cursos'},
        { label: 'Perfiles', link:'/perfiles' },
        { label: 'Configuración', link:'/configuracion' },
        { label: 'Cerrar sesión', link:'/cursos' }
      ];
}

