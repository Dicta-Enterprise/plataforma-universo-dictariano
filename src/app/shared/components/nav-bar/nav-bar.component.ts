import { Component, OnInit, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  count$: Observable<number>;
  menuOpen = false;
  submenuOpen = false;

  constructor(
    private cart: CartService,
    public auth: AuthService,
    private router: Router
  ) {
    this.count$ = cart.items$.pipe(map(items => items.length));
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen = false);

    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', styleClass: 'custom-menu-item', routerLink: '/' },
      { label: 'Cursos', icon: 'pi pi-fw pi-book', styleClass: 'custom-menu-item', routerLink: '/courses' },
      { label: 'Nosotros', icon: 'pi pi-fw pi-users', styleClass: 'custom-menu-item', routerLink: '/about' },
    ];
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    // ahora SIEMPRE cierra, en móvil y en desktop
    this.menuOpen = false;
  }

  toggleSubmenu(e: MouseEvent) {
  e.preventDefault();      // evita que el <a> haga scroll al top
  this.submenuOpen = !this.submenuOpen;
  }

  closeSubmenu() {
  this.submenuOpen = false;
  }


  // Delegación de eventos: si se hace click en un <a>, cerramos
  onNavClick(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor) this.closeMenu();
  }

  abrirPerfil() {
    alert('Ir a perfil (aquí va tu lógica)');
  }
}
