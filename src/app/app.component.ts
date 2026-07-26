import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './pages/auth/services/auth.service';
import { ModalHostComponent } from './containers/host/app-modal-host.component';
import { ModalService } from './containers/host/app-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'front-magment-universodicta';
  @ViewChild(ModalHostComponent) host!: ModalHostComponent;
  constructor(
    private modalService: ModalService,
    private primengConfig: PrimeNGConfig,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.checkSession();
    this.primengConfig.setTranslation({
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Es igual a',
      notEquals: 'No es igual a',
      noFilter: 'Sin filtro',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      is: 'Es',
      isNot: 'No es',
      before: 'Antes',
      after: 'Después',
      clear: 'Limpiar',
      apply: 'Aplicar',
      matchAll: 'Coincide con todo',
      matchAny: 'Coincide con cualquiera',
      addRule: 'Agregar regla',
      removeRule: 'Eliminar regla',
      accept: 'Aceptar',
      reject: 'Cancelar',
    });
  }

  ngAfterViewInit(): void {
    this.modalService.registerHost(this.host);
  }
}