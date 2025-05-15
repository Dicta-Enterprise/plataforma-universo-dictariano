import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { GalaxiaFacade } from 'src/app/shared/patterns/facade/managment/galaxia-facade';

@Component({
  selector: 'app-galaxias',
  templateUrl: './galaxias.component.html',
  styleUrls: ['./galaxias.component.css'],
})
export class GalaxiasComponent {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  galaxia: GalaxiaManagment = new GalaxiaManagment();
  isNuevaGalaxia: boolean = false;
  galaxiaAEliminar: GalaxiaManagment | null = null;

  galaxias$ = this.galaxiaFacade.galaxias$;

  constructor(
    private readonly galaxiaFacade: GalaxiaFacade,
    private readonly alertService: AlertService,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.galaxiaFacade.listarGalaxias();
    
  }

  showNuevaGalaxia(event?: boolean) {
    if (event != undefined) {
      this.isNuevaGalaxia = event;
      this.galaxia = new GalaxiaManagment();
      return;
    }

    this.isNuevaGalaxia = !this.isNuevaGalaxia;
  }

  editarGalaxia(galaxia: GalaxiaManagment) {
    this.galaxia = galaxia;
    this.showNuevaGalaxia();
  }

  confirmarEliminacion(galaxia: GalaxiaManagment) {
    this.confirmationService.confirm({
      message: `Esto eliminará la galaxia "${galaxia.nombre}"`,
      header: '¿Eliminar Galaxia?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.eliminarGalaxia(galaxia.id);
      },
      reject: () => {
        this.alertService.showInfo(
          'Eliminación cancelada',
          'No se eliminó la galaxia'
        );
      },
    });
  }

  eliminarGalaxia(id: string) {
    this.galaxiaFacade.eliminarGalaxia(id);
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
