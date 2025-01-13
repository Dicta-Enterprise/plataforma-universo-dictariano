import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AppTopbarComponent {
  @Input() usuario: any | null;
  position: string = 'left'

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // private cookiService:AuthCookieService,
    
  ) {}

  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
        message: 'Esta seguro que quiere cerrar su sesión?',
        header: 'Alerta',
        icon: 'pi pi-info-circle',
        acceptLabel:'Si',
        rejectLabel:'No',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Exitoso', detail: 'Cierre de Sesión Exitoso',  });
            this.logout();
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Cierre de Sesión Rechazado' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Cierre de Sesión Cancelado' });
                    break;
            }
        },
        key: 'positionDialog'
    });
}


  logout() {
    // this.cookiService.clearToken();
    this.router.navigateByUrl('/');
  }

}
