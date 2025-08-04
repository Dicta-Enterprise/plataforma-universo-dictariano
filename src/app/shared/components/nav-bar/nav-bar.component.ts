import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  count$: Observable<number>;
  constructor(private cart: CartService) {
    this.count$ = cart.items$.pipe(map(items => items.length));
  }
  
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
