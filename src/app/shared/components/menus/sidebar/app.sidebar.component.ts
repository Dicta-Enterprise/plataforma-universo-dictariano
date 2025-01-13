import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { MENU_CONSTANT } from 'src/app/core/constants/constants';

export interface IMenu {
  idMenu: number;
  idPadre: number;
  items: IItems[];
  nombre: string;
}

export interface IItems {
  padre: IPadre;
  idMenu: number;
  nombre: string;
  ruta?: string;
  idPadre: number;
  icono: string;
  items?: IItems[];
}

export interface IPadre {
  idMenu: number;
  nombre: string;
  idPadre: number;
  ruta?: string; // Hacer opcional si no siempre está presente
  icono?: string; // Agregado en caso de que esté presente en algunos objetos
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
  styleUrls: ['./app.sidebar.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AppSidebarComponent implements OnInit {
  @Input() usuario: any | null;

  menuItems: IMenu[] = [
    {
      idMenu: 1,
      idPadre: 0,
      nombre: 'Inicio',
      items: [
        {
          padre: {
            idMenu: 1,
            idPadre: 0,
            nombre: 'Inicio',
          },
          idMenu: 2,
          idPadre: 1,
          nombre: 'Dashboard',
          icono: 'pi pi-home',
          ruta: '/admin',
        },
      ],
    },
  ];

  isLoading: boolean = false;
  active: boolean = false;
  position: string = 'left';

  colors: string[] = [
    'text-green-500',
    'text-blue-500',
    'text-yellow-500',
    'text-red-500',
  ];

  // Método para obtener un color aleatorio
  getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

  constructor(
    private confirmationService: ConfirmationService,

    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuItems = MENU_CONSTANT;
    console.log("data");
  }

  toggleTheme() {
    this.active = !this.active;
  }

  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Esta seguro que quiere cerrar su sesión?',
      header: 'Alerta',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Exitoso',
          detail: 'Cierre de Sesión Exitoso',
        });
        this.logout();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rechazado',
              detail: 'Cierre de Sesión Rechazado',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Cierre de Sesión Cancelado',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }

  logout() {
    // this.cookiService.clearToken();
    this.router.navigateByUrl('/');
  }
}
