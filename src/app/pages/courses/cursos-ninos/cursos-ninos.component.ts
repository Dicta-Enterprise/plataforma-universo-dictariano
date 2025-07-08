import { Component, OnInit } from '@angular/core';
import { cursosData } from 'src/app/shared/data/cursosData';

@Component({
  selector: 'app-cursos-ninos',
  templateUrl: './cursos-ninos.component.html',
})
export class CursosNinosComponent implements OnInit {
  cursos: any[] = [];

  ngOnInit(): void {
    this.cursos = cursosData.filter(curso => curso.categoria === 'ninos');
  }
}

