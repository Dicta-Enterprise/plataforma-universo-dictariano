import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  userItems: MenuItem[];
  count$: Observable<number>;

  constructor(
     private cart: CartService,
     public auth: AuthService 
  ) {
    this.count$ = cart.items$.pipe(map(items => items.length));
  }
  
  
  ngOnInit(): void {
    this.userItems = [
      {
        label: 'Ver perfil',
        icon: 'pi pi-user', // Icono de PrimeIcons
        //command: () => this.onViewProfile()
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
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out', // Icono de PrimeIcons
        command: () => this.logout()
      }
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
            routerLink: '/courses'
          },
          {
            label: 'Padres',
            icon: 'pi pi-fw pi-book',
            styleClass: 'custom-menu-item',
            routerLink: '/courses'
          },
          {
            label: 'Jóvenes',
            icon: 'pi pi-fw pi-book',
            styleClass: 'custom-menu-item',
            routerLink: '/courses'
          },
          {
            label: 'Niños',
            icon: 'pi pi-fw pi-book',
            styleClass: 'custom-menu-item',
            routerLink: '/courses'
          }
        ]
      },
      {
        label: 'Acerca de Nosotros',
        icon: 'pi pi-fw pi-users',
        styleClass: 'custom-menu-item',
        routerLink: '/about',
      }
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
