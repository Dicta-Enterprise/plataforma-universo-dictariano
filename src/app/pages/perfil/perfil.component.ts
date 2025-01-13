import { Component } from '@angular/core';
import { C_MENU_CLIENTE } from 'src/app/core/constants/constants';
import { Menu } from 'src/app/shared/class/Menu.class';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
   menus:Menu[] = C_MENU_CLIENTE;

}
