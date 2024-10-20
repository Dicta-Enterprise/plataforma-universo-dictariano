import { Component } from '@angular/core';
import { MENU_CONSTANT } from 'src/app/core/constants/constants';
import { IMenuReponsesDto } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  menus:IMenuReponsesDto[] = MENU_CONSTANT;

  constructor() { }


}
