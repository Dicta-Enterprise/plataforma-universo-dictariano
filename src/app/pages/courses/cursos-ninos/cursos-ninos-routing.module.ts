import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CursosNinosComponent } from "./cursos-ninos.component";

const routes: Routes = [
   { path: '',
    component: CursosNinosComponent,
   }


];

@NgModule ({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CursosNinosRoutingModule {}