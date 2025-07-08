import { Component, OnInit } from '@angular/core';
import { cursosData } from 'src/app/shared/data/cursosData';

@Component({
  selector: 'app-cursos-jovenes',
  templateUrl: './cursos-jovenes.component.html',
})
export class CursosJovenesComponent implements OnInit {
  cursos: any[] = [];

  ngOnInit(): void {
    this.cursos = cursosData.filter(curso => curso.categoria === 'jovenes');
  }
}
