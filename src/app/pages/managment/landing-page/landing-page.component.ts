import { Component } from '@angular/core';
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
export class LandingPageComponent {

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
    //this.listarLanding();
  }

  /*listarLanding(){
    this.isLoading = true;
    this.subscription.add(
      this.landingService.listarLandingService$().subscribe({
        next: (data) => {
          this.landings = data.map(curso =>({
            ...this.landing,
            planetaNombre: this.getNombrePlanetaPorId(landing.planetaId)
          }))
        }
      })
    )
  }*/

  showNuevaLanding(event?: boolean) {
    if (event != undefined) {
      this.isNuevaLanding = event;
      return;
    }

    this.isNuevaLanding = !this.isNuevaLanding;
  }

  editarLanding(landing: LandingPageManagment) { }

  eliminarLanding(landing: LandingPageManagment) { }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
