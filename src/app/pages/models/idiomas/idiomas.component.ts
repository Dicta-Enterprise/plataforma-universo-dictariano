import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize, Subscription } from 'rxjs';
import { Idioma } from 'src/app/core/class/models';
import { IdiomaService } from 'src/app/core/services/models/idioma/idioma.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  idiomas: Idioma[] = [];
  idioma: Idioma = new Idioma();
  isNuevoIdioma: boolean = false;
  idiomaAEliminar: Idioma | null = null;

  constructor(
    private readonly idiomaManagmentService: IdiomaService,
    private readonly alertService: AlertService,
    private readonly confirmationService: ConfirmationService

  ) { }

  ngOnInit(): void {
    this.listarIdiomas();
  }

  listarIdiomas() {
    this.isLoading = true;
    this.subscription.add(
      this.idiomaManagmentService
        .listarIdiomasService$()
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.idiomas = response;
            console.log('idiomas', this.idiomas);
          },
          error: (error) => {
            this.alertService.showError(
              'Ups...',
              'Ocurrio un error al listar los idiomas'
            );
          },
        })
    );
  }

  showNuevoIdioma(event?: boolean) {
    if (event != undefined) {
      this.isNuevoIdioma = event;
      this.idioma = new Idioma();
      return;
    }

    this.isNuevoIdioma = !this.isNuevoIdioma;
  }

  editarIdioma(idioma: Idioma) {
    this.idioma = idioma;
    this.showNuevoIdioma();
  }

  confirmarEliminacion(idioma: Idioma) {
    this.idiomaAEliminar = idioma;

    this.confirmationService.confirm({
      message: `Esto eliminará el idioma "${idioma.nombre}"`,
      header: '¿Eliminar Idioma?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.eliminarIdioma();
      },
      reject: () => {
        this.alertService.showInfo('Eliminación cancelada', 'No se eliminó el idioma');
        this.idiomaAEliminar = null;
      }
    });
  }

  eliminarIdioma() {
    if (!this.idiomaAEliminar) return;

    this.idiomaManagmentService.eliminarIdiomaService$(this.idiomaAEliminar.id).subscribe({
      next: () => {
        this.alertService.showSuccess('Eliminación exitosa', 'El idioma ha sido eliminado correctamente');
        this.listarIdiomas();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        const mensaje = err.error?.message || 'Ocurrió un error al eliminar el idioma';
        this.alertService.showError('Error', mensaje);
      }
    });

    this.idiomaAEliminar = null;
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
