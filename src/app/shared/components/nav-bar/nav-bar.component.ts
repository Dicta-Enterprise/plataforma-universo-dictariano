import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        styleClass: 'custom-menu-item',
        routerLink: '/',
      },

      {
        label: 'Cursos',
        icon: 'pi pi-fw pi-book',
        styleClass: 'custom-menu-item',
        routerLink: '/courses',
      },
      {
        label: 'Nosotros',
        icon: 'pi pi-fw pi-users',
        styleClass: 'custom-menu-item',
        routerLink: '/about',
      },
    ];
  }
}
