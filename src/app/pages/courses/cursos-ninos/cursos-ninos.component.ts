import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { CCURSO_CONSTANT } from 'src/app/core/constants/courses/CCurso.constant';

@Component({
  selector: 'app-cursos-ninos',
  templateUrl: './cursos-ninos.component.html',
})
export class CursosNinosComponent implements OnInit {
  cursos: any[] = [];

  ngOnInit(): void {
    this.cursos = CCURSO_CONSTANT.filter(curso => curso.categoria === 'ninos');
  }
}

