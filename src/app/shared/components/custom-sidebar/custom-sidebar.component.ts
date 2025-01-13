import { Component, Input } from '@angular/core';
import { Menu } from '../../class/Menu.class';
import { IMenu } from 'src/app/core/interfaces/interfaces';


@Component({
  selector: 'app-custom-sidebar',
  templateUrl: './custom-sidebar.component.html',
  styleUrls: ['./custom-sidebar.component.css'],
})
export class CustomSidebarComponent {
  @Input() menus: IMenu[] = [];

  active: boolean = false;

  toggleTheme() {
    this.active = !this.active;
  }
}
