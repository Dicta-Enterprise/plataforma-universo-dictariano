import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { CursosPadresComponent } from './cursos-padres.component';
import { CursosPadresRoutingModule } from './cursos-padres-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ CursosPadresComponent ],
  imports: [
    CommonModule,
    SharedModule,
    CursosPadresRoutingModule
  ]
})
export class CursosPadresModule { }
