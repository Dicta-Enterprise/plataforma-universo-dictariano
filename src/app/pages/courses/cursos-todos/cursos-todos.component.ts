import { Component, OnInit } from '@angular/core';
import { cursosData } from 'src/app/shared/data/cursosData';

@Component({
  selector: 'app-cursos-todos',
  templateUrl: './cursos-todos.component.html',
})
export class CursosTodosComponent implements OnInit {
  cursosNinos: any[] = [];
  cursosJovenes: any[] = [];
  cursosPadres: any[] = [];

  ngOnInit(): void {
    this.cursosNinos = cursosData.filter(curso => curso.categoria === 'ninos');
    this.cursosJovenes = cursosData.filter(curso => curso.categoria === 'jovenes');
    this.cursosPadres = cursosData.filter(curso => curso.categoria === 'padres');
  }
}
