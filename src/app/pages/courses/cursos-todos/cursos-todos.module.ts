import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CursosTodosRoutingModule } from "./cursos-todos-routing.module";
import { CursosTodosComponent } from "./cursos-todos.component";
import { SharedModule } from "src/app/shared/shared.module";

import {CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@NgModule({
    declarations: [ CursosTodosComponent],
    imports: [
        CommonModule,
        CursosTodosRoutingModule,
        SharedModule,
        CarouselModule,   // ← carousel
        ButtonModule,     // ← p-button
        TagModule         // ← p-tag
    ]
})
export class CursosTodosModule { }