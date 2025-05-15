import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCursosDropdownComponent } from './custom-cursos-dropdown/custom-cursos-dropdown.component';
import { CustomPlanetasDropdownComponent } from './custom-planetas-dropdown/custom-planetas-dropdown.component';
import { CustomCategoriaDropdownComponent } from './custom-categoria-dropdown/custom-categoria-dropdown.component';
import { ManagmentPrimengModule } from '../../themes/managment/managment-primeng.module';
import { CustomProfesorDropdownComponent } from './custom-profesor-dropdown/custom-profesor-dropdown.component';
import { CustomIdiomaDropdownComponent } from './custom-idioma-dropdown/custom-idioma-dropdown.component';

@NgModule({
  declarations: [
    CustomCursosDropdownComponent,
    CustomCategoriaDropdownComponent,
    CustomProfesorDropdownComponent,
    CustomIdiomaDropdownComponent,
    CustomPlanetasDropdownComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ManagmentPrimengModule],
  exports: [
    CustomCursosDropdownComponent,
    CustomCategoriaDropdownComponent,
    CustomProfesorDropdownComponent,
    CustomIdiomaDropdownComponent,
    CustomPlanetasDropdownComponent
  ],
})
export class CustomDropdownsModule {}
