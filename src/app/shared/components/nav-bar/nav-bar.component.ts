import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router } from '@angular/router';

export interface SidebarItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  itemsSidebar: SidebarItem[] = [
    {
      label: 'Mi cuenta',
      icon: 'pi-user',
      routerLink: 'my-family/my-account',
    },
    {
      label: 'Mis cursos',
      icon: 'pi-desktop',
      routerLink: 'my-family/my-courses',
    },
    {
      label: 'Mi progreso',
      icon: 'pi-chart-line',
      routerLink: 'my-family/my-progress',
    },
    {
      label: 'Mi comunidad',
      icon: 'pi-users',
      routerLink: 'my-family/my-community',
    },
    {
      label: 'Mi certificación',
      icon: 'pi-bookmark',
      routerLink: 'my-family/mycertification',
    },
    {
      label: 'Mi facturación',
      icon: 'pi-file',
      routerLink: 'my-family/my-billing',
    },
  ];
  userItems: MenuItem[];
  count$: Observable<number>;
  searchQuery = '';
  searchVisible = false;

  constructor(
    private cart: CartService,
    public auth: AuthService,
    public router: Router,
  ) {
    this.count$ = cart.items$.pipe(map((items) => items.length));
  }

  buscar() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/courses'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }

  ngOnInit(): void {
    this.userItems = [
      {
        label: 'Ver perfil',
        icon: 'pi pi-user', // Icono de PrimeIcons
        //command: () => this.onViewProfile()
        routerLink: '/perfil/mi-informacion',
      },
      {
        label: 'Ver mis compras',
        icon: 'pi pi-shopping-cart', // Icono de PrimeIcons
        //command: () => this.onViewPurchases()
      },
      {
        label: 'Ver mis cursos',
        icon: 'pi pi-book', // Icono de PrimeIcons
        //command: () => this.onViewMyCourses()
        routerLink: '/my-courses',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out', // Icono de PrimeIcons
        command: () => this.logout(),
      },
    ];
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
        items: [
          {
            label: 'Todos los cursos',
            icon: 'pi pi-fw pi-book',
            styleClass: 'custom-menu-item',
            routerLink: '/courses',
          },
          {
            label: 'Padres',
            icon: 'pi pi-fw pi-book',
            styleClass: 'custom-menu-item',
            routerLink: '/courses',
          },
          {
            label: 'Jóvenes',
            icon: 'pi pi-fw pi-book',
            styleClass: 'custom-menu-item',
            routerLink: '/courses',
          },
          {
            label: 'Niños',
            icon: 'pi pi-fw pi-book',
            styleClass: 'custom-menu-item',
            routerLink: '/courses',
          },
        ],
      },
      {
        label: 'Acerca de Nosotros',
        icon: 'pi pi-fw pi-users',
        styleClass: 'custom-menu-item',
        routerLink: '/about',
      },
    ];
  }
  abrirPerfil() {
    // Por ahora puedes navegar a /perfil, o mostrar modal
    // this.router.navigate(['/perfil']);
    alert('Ir a perfil (aquí va tu lógica)');
  }
  logout(): void {
    this.auth.logout();
  }
}
