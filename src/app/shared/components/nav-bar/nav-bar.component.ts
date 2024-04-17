import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  items: MenuItem[] | undefined;


  ngOnInit(): void {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-file',
          styleClass:'custom-menu-item',
          routerLink:'/auth/login'
        },
        {
          label: 'Servicios',
          icon: 'pi pi-fw pi-file',
          styleClass:'custom-menu-item'
        },
        {
          label: 'Cursos',
          icon: 'pi pi-fw pi-file',
          styleClass:'custom-menu-item'
        },
        {
          label: 'Nosotros',
          icon: 'pi pi-fw pi-file',
          styleClass:'custom-menu-item'
        },
      ]
  }
}
