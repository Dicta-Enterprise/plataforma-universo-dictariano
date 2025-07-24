import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { CCURSO_CONSTANT } from 'src/app/core/constants/courses/CCurso.constant';
import { CursosData } from 'src/app/shared/data/cursosData';

@Component({
  selector: 'app-cursos-todos',
  templateUrl: './cursos-todos.component.html',
})
export class CursosTodosComponent implements OnInit {
  cursosNinos: Curso[] = [];
  cursosJovenes: Curso[] = [];
  cursosPadres: Curso[] = [];

  ngOnInit(): void {
    this.cursosNinos = CCURSO_CONSTANT.filter(curso => curso.categoria === 'ninos');
    this.cursosJovenes = CCURSO_CONSTANT.filter(curso => curso.categoria === 'jovenes');
    this.cursosPadres = CCURSO_CONSTANT.filter(curso => curso.categoria === 'padres');
  }
}
