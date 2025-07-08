import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCursoComponent } from './components/card-curso/card-curso.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CardCursoComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
  ],
  exports: [CardCursoComponent]
})
export class SharedModule { }
