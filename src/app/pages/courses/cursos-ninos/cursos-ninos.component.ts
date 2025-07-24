import { Component, OnInit } from '@angular/core';
import { CursosData } from 'src/app/shared/data/cursosData';

@Component({
  selector: 'app-cursos-ninos',
  templateUrl: './cursos-ninos.component.html',
})
export class CursosNinosComponent implements OnInit {
  cursos: any[] = [];

  ngOnInit(): void {
    this.cursos = CursosData.filter(curso => curso.categoria === 'ninos');
  }
}

