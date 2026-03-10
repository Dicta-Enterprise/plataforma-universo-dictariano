import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { CategoriaManagmentService } from 'src/app/core/services/managment/categoria/categoria-managment.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaFacade {
  categorias$ = new BehaviorSubject<CategoriaManagment[]>([]);
  categoria$ = new BehaviorSubject<CategoriaManagment>(
    new CategoriaManagment()
  );

  constructor(
    private readonly categoriaService: CategoriaManagmentService,
    private readonly alertService: AlertService
  ) {}

  listarCategorias() {
    this.categoriaService.listarCategoriasService$().subscribe({
      next: (response) => {
        this.categorias$.next(response);
        this.alertService.showSuccess('Exito', 'Categorias cargadas');
      },
    });
  }
}
