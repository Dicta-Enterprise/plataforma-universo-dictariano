import { Component, Input } from '@angular/core';
import { Menu } from '../../class/Menu.class';

@Component({
  selector: 'app-custom-sidebar',
  templateUrl: './custom-sidebar.component.html',
  styleUrls: ['./custom-sidebar.component.css']
})
export class CustomSidebarComponent {


  @Input() menus:Menu[] = [];



}
