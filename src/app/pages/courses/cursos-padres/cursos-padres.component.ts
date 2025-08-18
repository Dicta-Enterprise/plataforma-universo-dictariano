import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { CCURSO_CONSTANT } from 'src/app/core/constants/courses/CCurso.constant';

@Component({
  selector: 'app-cursos-padres',
  templateUrl: './cursos-padres.component.html',
})
export class CursosPadresComponent implements OnInit {
  cursos: any[] = [];

  ngOnInit(): void {
    this.cursos = CCURSO_CONSTANT.filter(curso => curso.categoria === 'padres');
  }
}