import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { finalize, Subscription } from 'rxjs';
import { Categoria } from 'src/app/core/class/models';
import { CategoriaService } from 'src/app/core/services/models/categoria/categoria.service';
import { ActivosState } from 'src/app/shared/enums';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  categorias: Categoria[] = [];
  categoria: Categoria = new Categoria();
  isNuevaCategoria: boolean = false;
  categoriaState: ActivosState = ActivosState.ACTIVO;

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this.isLoading = true;
    this.subscription.add(
      this.categoriaService
        .listarCategoriasService$()
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.categorias = response;
          },
          error: ({ error }) => {
            this.alertService.showError('Upss..', error.message);
          },
        })
    );
  }

  showNuevaCategoria(event?: boolean) {
    if (event != undefined) {
      this.isNuevaCategoria = event;
      this.categoria = new Categoria();
      return;
    }

    this.isNuevaCategoria = !this.isNuevaCategoria;
  }

  editarCategoria(categoria: Categoria) {
    this.categoria = categoria;
    this.showNuevaCategoria();
  }

  eliminarCategoria(categoria: Categoria) {
    this.isLoading = true;
    this.subscription.add(
      this.categoriaService
        .eliminarCategoriaService$(categoria.id)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Exito',
              'Categoria eliminada correctamente'
            );
            this.listarCategorias();
          },
          error: ({ error }) => {
            this.alertService.showError('Upss..', error.message);
          },
        })
    );
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
