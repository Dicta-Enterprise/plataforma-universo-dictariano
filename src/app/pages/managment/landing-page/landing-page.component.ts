import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  isNuevaLanding: boolean = false;
  landings: LandingPageManagment[] = []
  landing: LandingPageManagment = new LandingPageManagment();
  planetas = CPLANETAS_MANAGMENT; 
  buscarlandingForm: FormGroup
  landingAEliminar: LandingPageManagment | null = null;

  constructor(
    private fb: FormBuilder,
    private landingService: LandingPageManagmentService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.listarLanding();
  }

  listarLanding() {
    this.isLoading = true;
    console.log("Lista de planetas disponibles:", this.planetas);
    this.subscription.add(
      this.landingService.listarLandingService$()
      .pipe(
        map((landings: LandingPageManagment[]) => 
          landings.map(landing => ({
            ...landing,
            planetaNombre: this.getNombrePlanetaPorId(landing.planetaId)
          }))
        ),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data) => {
          this.landings = data;
          //console.log("Landings:" , data)
        },
        error: (error) => {
          console.error('Error al obtener Landing Page:', error);
        }
      })
    );
  }

  getNombrePlanetaPorId(id: string): string {
    const planeta = this.planetas.find(plan => plan.id === id);
    return planeta ? planeta.descripcion : 'Planeta no encontrado';
  }

  showNuevaLanding(event?: boolean) {
    if (event != undefined) {
      this.isNuevaLanding = event;
      this.listarLanding();
      return;
    }

    this.isNuevaLanding = !this.isNuevaLanding;

    if (this.isNuevaLanding) {
      this.landing = new LandingPageManagment();
    }
  }

  editarLanding(landing: LandingPageManagment) {
    this.showNuevaLanding(true);
    this.landing = {...landing}
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

    this.landingService.eliminarLandingService$(this.landingAEliminar.id).subscribe({
      next: () => {
        this.alertService.showSuccess('Eliminación exitosa', 'La landing page ha sido eliminada correctamente');
        this.listarLanding();
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
