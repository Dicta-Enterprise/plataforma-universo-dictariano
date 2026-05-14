import { Component, Input, HostListener } from '@angular/core';
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

  sidebarVisible: boolean = false;
  isMobile: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.sidebarVisible = true;
    } else {
      this.sidebarVisible = false;
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }
  
  toggleTheme() {
    this.active = !this.active;
  }

  
}
