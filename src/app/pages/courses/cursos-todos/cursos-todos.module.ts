import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CursosTodosRoutingModule } from "./cursos-todos-routing.module";
import { CursosTodosComponent } from "./cursos-todos.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [ CursosTodosComponent],
    imports: [
        CommonModule,
        CursosTodosRoutingModule,
        SharedModule
    ]
})
export class CursosTodosModule { }