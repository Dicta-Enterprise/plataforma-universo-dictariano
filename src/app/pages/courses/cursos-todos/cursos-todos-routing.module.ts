import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CursosTodosComponent } from "./cursos-todos.component";

const routes: Routes = [
   { path: '',
    component: CursosTodosComponent,
   }


];

@NgModule ({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CursosTodosRoutingModule {}