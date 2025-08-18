import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CursosJovenesComponent } from "./cursos-jovenes.component";

const routes: Routes = [
   { path: '',
    component: CursosJovenesComponent,
   }


];

@NgModule ({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CursosJovenesRoutingModule {}