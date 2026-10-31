import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoShortRoutingModule } from './curso-short-routing.module';
import { CursoShortComponent } from './curso-short.component';

@NgModule({
  declarations: [CursoShortComponent],
  imports: [CommonModule, CursoShortRoutingModule],
})
export class CursoShortModule {}
