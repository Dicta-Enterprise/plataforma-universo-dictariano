import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';

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

  constructor() { }

  ngOnInit(): void { }

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
