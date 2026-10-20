import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosTodosRoutingModule } from './cursos-todos-routing.module';
import { CursosTodosComponent } from './cursos-todos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [CursosTodosComponent],
  imports: [
    CommonModule,
    CursosTodosRoutingModule,
    SharedModule,
    ButtonModule,
    TagModule,
    FormsModule,
  ],
})
export class CursosTodosModule {}
