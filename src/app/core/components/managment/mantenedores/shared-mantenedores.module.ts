import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaCategoriaModule } from './nueva-categoria/nueva-categoria.module';
import { NuevaGalaxiaModule } from './nueva-galaxia/nueva-galaxia.module';
import { NuevoCursoModule } from './nuevo-curso/nuevo-curso.module';
import { NuevoIdiomaModule } from './nuevo-idioma/nuevo-idioma.module';
import { NuevoPlanetaModule } from './nuevo-planeta/nuevo-planeta.module';
import { NuevoProfesorModule } from './nuevo-profesor/nuevo-profesor.module';
import { NuevaLandingModule } from './nueva-landing/nueva-landing.module';



@NgModule({
  imports: [
    CommonModule,
    NuevaCategoriaModule,
    NuevaGalaxiaModule,
    NuevoCursoModule,
    NuevoIdiomaModule,
    NuevoPlanetaModule,
    NuevoProfesorModule,
    NuevaLandingModule
  ],
  exports: [
    NuevaCategoriaModule,
    NuevaGalaxiaModule,
    NuevoCursoModule,
    NuevoIdiomaModule,
    NuevoPlanetaModule,
    NuevoProfesorModule,
    NuevaLandingModule
  ]
})
export class SharedMantenedoresModule { }
