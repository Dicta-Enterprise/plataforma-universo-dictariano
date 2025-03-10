import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize, map, Subscription } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';
import { CPLANETAS_MANAGMENT } from 'src/app/core/constants/managment/CLanding-managment.constants';
import { LandingPageManagmentService } from 'src/app/core/services/managment/landing-page/landing-managment.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  landings: LandingPageManagment[] = []
  landing: LandingPageManagment = new LandingPageManagment();
  isNuevaLanding: boolean = false;

  planetas = CPLANETAS_MANAGMENT;
  landingAEliminar: LandingPageManagment | null = null;

  constructor(
    private readonly landingManagmentService: LandingPageManagmentService,
    private readonly alertService: AlertService,
    private readonly confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.listarLandings();
  }

  listarLandings() {
    this.isLoading = true;
    this.subscription.add(
      this.landingManagmentService
        .listarLandingService$()
        .pipe(map((response) => response.map((landing) =>
          new LandingPageManagment({
            ...landing,
            planetaId: this.obtenerPlaneta(landing.planetaId)
          })
        )),
          finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (landings) => {
            this.landings = landings;
            console.log('Landings:', this.landings);
          },
          error: () => {
            this.alertService.showError(
              'Ups..',
              'Ocurrió un error al listar las landings'
            );
          }
        })
    );
  }

  obtenerPlaneta(id: string): string {
    const planeta = this.planetas.find(plan => plan.id === id);
    return planeta ? planeta.descripcion : "Planeta no encontrado";
  }

  showNuevaLanding(event?: boolean) {
    if (event != undefined) {
      this.isNuevaLanding = event;
      this.landing = new LandingPageManagment();
      return;
    }

    this.isNuevaLanding = !this.isNuevaLanding;
  }

  editarLanding(landing: LandingPageManagment) {
    this.landing = landing;
    this.showNuevaLanding();
  }

  confirmarEliminacion(landing: LandingPageManagment) {
    this.landingAEliminar = landing;

    this.confirmationService.confirm({
      message: `Esto eliminará la landing "${landing.titulo}"`,
      header: '¿Eliminar Landing Page?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.eliminarLanding();
      },
      reject: () => {
        this.alertService.showInfo('Eliminación cancelada', 'No se eliminó la landing page');
        this.landingAEliminar = null;
      }
    });
  }

  eliminarLanding() {
    if (!this.landingAEliminar) return;

    this.landingManagmentService.eliminarLandingService$(this.landingAEliminar.id).subscribe({
      next: () => {
        this.alertService.showSuccess('Eliminación exitosa', 'La landing page ha sido eliminada correctamente');
        this.listarLandings();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        const mensaje = err.error?.message || 'Ocurrió un error al eliminar la landing page';
        this.alertService.showError('Error', mensaje);
      }
    });

    this.landingAEliminar = null;
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
