import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';
import { Cursos } from 'src/app/core/class/models';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  cursos: Cursos[] = [];

  constructor(
    private readonly cursosService: CursosService,
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
