import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetasComponent } from './planetas.component';
import { PlanetasRoutingModule } from './planetas-routing.module';

@NgModule({
  declarations: [PlanetasComponent],
  imports: [CommonModule, PlanetasRoutingModule],
})
export class PlanetasModule {}
