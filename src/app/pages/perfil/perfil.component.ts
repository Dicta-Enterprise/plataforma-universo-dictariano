import { Component } from '@angular/core';
import { C_MENU_CLIENTE_I } from 'src/app/core/constants/menus/CMenuClienteI.constant';
import { IMenu } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
   menus:IMenu[] = C_MENU_CLIENTE_I;

}
