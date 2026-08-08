import { Component } from '@angular/core';
import { SidebarItem } from 'src/app/core/interfaces/menus/sidebar-item.interface';

@Component({
  selector: 'app-my-family',
  templateUrl: './my-family.component.html',
  styleUrls: ['./my-family.component.css'],
})
export class MyFamilyComponent {
  // Definición de los elementos del menú lateral
  menuItems: SidebarItem[] = [
    {
      label: 'Mi cuenta',
      icon: 'pi-user',
      route: 'my-account',
    },
    {
      label: 'Mis cursos',
      icon: 'pi-desktop',
      route: 'my-courses',
    },
    {
      label: 'Mi progreso',
      icon: 'pi-chart-line',
      route: 'my-progress',
    },
    {
      label: 'Mi comunidad',
      icon: 'pi-users',
      route: 'my-community',
    },
    {
      label: 'Mi certificación',
      icon: 'pi-bookmark',
      route: 'mycertification',
    },
    {
      label: 'Mi facturación',
      icon: 'pi-file',
      route: 'my-billing',
    },
  ];
}
