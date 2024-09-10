import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  
})
export class ConfiguracionComponent {
  menuItems = [
    { label: 'Mi perfil', link:'/miperfil' },
    { label: 'Mis cursos', link:'/cursos'},
    { label: 'Perfiles', link:'/perfiles' },
    { label: 'Configuración', link:'/configuracion' },
    { label: 'Cerrar sesión', link:'/cursos' }
  ];
  stateOptions: any[] = [{ label: 'One-Way', value: 'one-way' },{ label: 'Return', value: 'return' }];

    value: string = 'off';
}

