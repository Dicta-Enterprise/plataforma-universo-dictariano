import { Component, OnInit } from '@angular/core';
import { cursosData } from 'src/app/shared/data/cursosData';

@Component({
  selector: 'app-cursos-padres',
  templateUrl: './cursos-padres.component.html',
})
export class CursosPadresComponent implements OnInit {
  cursos: any[] = [];

  ngOnInit(): void {
    this.cursos = cursosData.filter(curso => curso.categoria === 'padres');
  }
}
