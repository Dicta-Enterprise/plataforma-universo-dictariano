import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize, map, Subscription } from 'rxjs';
import { LandingPage } from 'src/app/core/class/models/landing-page/Landing.class';
import { CPLANETAS_CONSTANT } from 'src/app/core/constants/langing/CLanding.constants';
import { LandingPageService } from 'src/app/core/services/models/landing-page/landing.service';
import { PlanetasService } from 'src/app/core/services/models/planetas/planetas.service';
import { AlertService } from 'src/app/shared/services/alert.service';

// Los metodos que se manejan aqui tienen una misma estructura para el resto 
// de componentes pertenecientes a los MANTENEDORES

// Este es el componente padre, aqui se usan los servicios de listar y eliminar
// el componente hijo es nueva-landing (ubicar en core > components > nueva-landing)
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  landings: LandingPage[] = []
  landing: LandingPage = new LandingPage();
  isNuevaLanding: boolean = false;

  //planetas = CPLANETAS_MANAGMENT;
  // Almacena los planetas donde la clave es el ID y el valor es el nombre del planeta
  planetasMap: Map<string, string> = new Map();
  landingAEliminar: LandingPage | null = null;

  constructor(
    private readonly landingManagmentService: LandingPageService,
    private readonly planetaManagmentService: PlanetasService,
    private readonly alertService: AlertService,
    private readonly confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    //this.listarLandings();
    this.cargarPlanetas();
  }

  // Realicé el metodo de carga de Planetas para obtener desde la BD los planetas a Landing
  // Para revisar los servicios ubicar ( app > core > service > managment)
  cargarPlanetas() {
    this.subscription.add(
      this.planetaManagmentService.listarPlanetasService$().subscribe({
        next: (planetas) => {
          this.planetasMap = new Map(planetas.map(p => [p.id, p.nombre]));
          this.listarLandings();
        },
        error: () => {
          this.alertService.showError('Error', 'No se pudieron cargar los planetas');
        }
      })
    );
  }

  listarLandings() {
    this.isLoading = true;
    this.subscription.add(
      this.landingManagmentService
        .listarLandingService$()
        .pipe(map((response) => response.map((landing) =>
          new LandingPage({
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

  // Busca el nombre del planeta por su ID.
  obtenerPlaneta(id: string): string {
    return this.planetasMap.get(id) || 'Planeta no encontrado'
  }

  showNuevaLanding(event?: boolean) {
    if (event != undefined) {
      this.isNuevaLanding = event;
      this.landing = new LandingPage();
      return;
    }

    this.isNuevaLanding = !this.isNuevaLanding;
  }

  editarLanding(landing: LandingPage) {
    this.landing = landing;
    this.showNuevaLanding();
  }

  confirmarEliminacion(landing: LandingPage) {
    // Guarda la landing que se quiere eliminar
    this.landingAEliminar = landing;

    // Muestra un cuadro de confirmación antes de eliminar
    this.confirmationService.confirm({
      message: `Esto eliminará la landing "${landing.titulo}"`,
      header: '¿Eliminar Landing Page?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.eliminarLanding(); // Si acepta, procede con la eliminación
      },
      reject: () => {
        this.alertService.showInfo('Eliminación cancelada', 'No se eliminó la landing page');
        this.landingAEliminar = null;
      }
    });
  }

  eliminarLanding() {
    if (!this.landingAEliminar) return; // Si no hay landing seleccionada, no hace nada

    // Llama al servicio para eliminar la landing
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

    this.landingAEliminar = null; // Limpia la variable después del intento de eliminación
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
