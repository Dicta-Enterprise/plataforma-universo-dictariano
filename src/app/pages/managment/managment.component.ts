import { Component } from '@angular/core';
import { C_MENU_MANAGMENT } from 'src/app/core/constants/constants';
import { Menu } from 'src/app/shared/class/Menu.class';

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class ManagmentComponent {


  menus:Menu[] = C_MENU_MANAGMENT;

}
