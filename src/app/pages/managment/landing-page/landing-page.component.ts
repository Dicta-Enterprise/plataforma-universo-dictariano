import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';
import { LandingPageManagmentService } from 'src/app/core/services/managment/landing-page/landing-managment.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  isNuevaLanding: boolean = false;
  landings: LandingPageManagment[] = []
  landing: LandingPageManagment = new LandingPageManagment();

  buscarlandingForm:FormGroup


  planetas = [
    { id: '6792877e2942e670016454de', nombre: 'Luminara' },
    { id: '6792d890005fc1e6836977f1', nombre: 'Planeta 2' },
    { id: '6792d8aa005fc1e6836977f2', nombre: 'Planeta 3' },
    { id: '6792d8bd005fc1e6836977f3', nombre: 'Planeta 4' }
  ];

  constructor(
    private fb:FormBuilder,
    private landingService: LandingPageManagmentService
  ) { }

  ngOnInit(): void { 
    this.listarLanding();
  }

  listarLanding() {
    this.isLoading = true;
    this.subscription.add(
      this.landingService.listarLandingService$().subscribe({
        next: (data) => {
          this.landings = data.map(landing => ({
            ...landing,
            planetaNombre: this.getNombrePlanetaPorId(landing.planetaId)
          }));
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al obtener Landing Page:', error);
          this.isLoading = false;
        }
      })
    );
  }

  getNombrePlanetaPorId(id: string): string {
    const planeta = this.planetas.find(plan => plan.id === id);
    return planeta ? planeta.nombre : 'Planeta no encontrado';
  }
  
  showNuevaLanding(event?: boolean) {
    if(event != undefined){
      this.isNuevaLanding = event;
      this.listarLanding();
      return
    }
    this.isNuevaLanding = !this.isNuevaLanding;
  }

  editarLanding(landing: LandingPageManagment) {
    this.isNuevaLanding = true;  
    this.landingService.obtenerLandingService$(landing.id).subscribe({
      next: (data) => {
        this.landing = data;
      },
      error: (error) => {
        console.error('Error al obtener la landing:', error);
      }
    });
  }
  
  eliminarLanding(landing: LandingPageManagment) {
    if (confirm('¿Estás seguro de que deseas eliminar esta landing?')) {
      this.isLoading = true; // Para mostrar el indicador de carga mientras se realiza la eliminación
      this.landingService.eliminarLandingService$(landing.id).subscribe({
        next: () => {
          this.landings = this.landings.filter(l => l.id !== landing.id);
          this.isLoading = false;
          //this.alertService.showSuccess('Eliminación exitosa', 'La landing page ha sido eliminada correctamente');
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error al eliminar la landing:', err);
          //this.alertService.showError('Error', 'Ha ocurrido un error al eliminar la landing page');
        }
      });
    }
  }
  

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
