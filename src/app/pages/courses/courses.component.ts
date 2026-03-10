import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';
import { CursoManagment } from 'src/app/core/class/managment/managment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  cursos: CursoManagment[] = [];

  constructor(
    private readonly cursosService: CursosManagmentService,
    private readonly alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos() {
    this.subscription.add(
      this.cursosService.listarCursosService$().subscribe({
        next: (data) => {
          this.cursos = data;
        },
        error: () => {
          this.alertService.showError(
            'Upss..',
            'Ocurrio un error al listar de los cursos',
          );
        },
      }),
    );
  }
}
