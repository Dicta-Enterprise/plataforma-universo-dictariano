import { Component } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GalaxiasManagmentService } from '../../../core/services/managment/galaxias/galaxias-managment.service';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-galaxias',
  templateUrl: './galaxias.component.html',
  styleUrls: ['./galaxias.component.css']
})
export class GalaxiasComponent {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  galaxias: GalaxiaManagment[] = [];
  galaxia: GalaxiaManagment = new GalaxiaManagment();
  isNuevaGalaxia: boolean = false;
  galaxiaAEliminar: GalaxiaManagment | null = null;

  constructor(
    private readonly galaxiaManagmentService: GalaxiasManagmentService,
    private readonly alertService: AlertService,
    private readonly confirmationService: ConfirmationService

  ) { }

  ngOnInit(): void {
    this.listarGalaxias();
  }

  listarGalaxias() {
    this.isLoading = true;
    this.subscription.add(
      this.galaxiaManagmentService
        .listarGalaxiasService$()
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.galaxias = response;
            console.log('galaxias', this.galaxias);
          },
          error: (error) => {
            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al listar las galaxias'
            );
          },
        })
    );
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
    this.galaxiaAEliminar = galaxia;

    this.confirmationService.confirm({
      message: `Esto eliminará la galaxia "${galaxia.nombre}"`,
      header: '¿Eliminar Galaxia?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.eliminarGalaxia();
      },
      reject: () => {
        this.alertService.showInfo('Eliminación cancelada', 'No se eliminó la galaxia');
        this.galaxiaAEliminar = null;
      }
    });
  }

  eliminarGalaxia() { 
    if (!this.galaxiaAEliminar) return;

    this.galaxiaManagmentService.eliminarGalaxiaService$(this.galaxiaAEliminar.id).subscribe({
      next: () => {
        this.alertService.showSuccess('Eliminación exitosa', 'La landing page ha sido eliminada correctamente');
        this.listarGalaxias();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        const mensaje = err.error?.message || 'Ocurrió un error al eliminar la galaxia';
        this.alertService.showError('Error', mensaje);
      }
    });

    this.galaxiaAEliminar = null;
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
