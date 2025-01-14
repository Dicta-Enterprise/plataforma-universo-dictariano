import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCursosDropdownComponent } from './custom-cursos-dropdown/custom-cursos-dropdown.component';
import { CustomGalaxiasDropdownComponent } from './custom-galaxias-dropdown/custom-galaxias-dropdown.component';
import { CustomPlanetasDropdownComponent } from './custom-planetas-dropdown/custom-planetas-dropdown.component';
import { CustomCategoriaDropdownComponent } from './custom-categoria-dropdown/custom-categoria-dropdown.component';
import { ManagmentPrimengModule } from '../../themes/managment/managment-primeng.module';

@NgModule({
  declarations: [
    CustomCursosDropdownComponent,
    CustomGalaxiasDropdownComponent,
    CustomPlanetasDropdownComponent,
    CustomCategoriaDropdownComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ManagmentPrimengModule],
  exports: [
    CustomCursosDropdownComponent,
    CustomGalaxiasDropdownComponent,
    CustomPlanetasDropdownComponent,
    CustomCategoriaDropdownComponent
  ],
})
export class CustomDropdownsModule {}
