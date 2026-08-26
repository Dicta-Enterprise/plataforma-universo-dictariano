import { Component, Input } from '@angular/core';
import { SidebarItem } from 'src/app/core/interfaces/menus/sidebar-item.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() items: SidebarItem[] = [];

  isOpen = false;

  openMenu() {
    this.isOpen = true;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
