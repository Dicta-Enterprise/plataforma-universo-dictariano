import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { CategoriaRoutingModule } from './categoria-routing.module';



@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
