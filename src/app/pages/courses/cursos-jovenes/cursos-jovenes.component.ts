import { Component, OnInit } from '@angular/core';
import { CursosData } from 'src/app/shared/data/cursosData';
@Component({
  selector: 'app-cursos-jovenes',
  templateUrl: './cursos-jovenes.component.html',
})
export class CursosJovenesComponent implements OnInit {
  cursos: any[] = [];

  ngOnInit(): void {
    this.cursos = CursosData.filter(curso => curso.categoria === 'jovenes');
  }
}
