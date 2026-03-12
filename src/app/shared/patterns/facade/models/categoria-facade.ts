import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Categoria } from 'src/app/core/class/models';
import { CategoriaService } from 'src/app/core/services/models/categoria/categoria.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaFacade {
  categorias$ = new BehaviorSubject<Categoria[]>([]);
  categoria$ = new BehaviorSubject<Categoria>(
    new Categoria()
  );

  constructor(
    private readonly categoriaService: CategoriaService,
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
