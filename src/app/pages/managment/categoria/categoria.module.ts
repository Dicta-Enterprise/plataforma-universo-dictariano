import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { SharedMantenedoresModule } from 'src/app/core/components/managment/mantenedores/shared-mantenedores.module';



@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    SharedMantenedoresModule
  ]
})
export class CategoriaModule { }
