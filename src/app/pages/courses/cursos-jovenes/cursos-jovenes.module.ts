import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { CursosJovenesComponent } from './cursos-jovenes.component';
import { CursosJovenesRoutingModule } from './cursos-jovenes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ CursosJovenesComponent ],
  imports: [
    CommonModule,
    SharedModule,
    CursosJovenesRoutingModule
  ]
})
export class CursosJovenesModule { }