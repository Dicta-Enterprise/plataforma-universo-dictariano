import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { finalize, Subscription } from 'rxjs';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { CategoriaManagmentService } from 'src/app/core/services/managment/categoria/categoria-managment.service';
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
  categorias: CategoriaManagment[] = [];
  categoria: CategoriaManagment = new CategoriaManagment();
  isNuevaCategoria: boolean = false;
  categoriaState:ActivosState = ActivosState.ACTIVO;

  constructor(
    private readonly categoriaManagmentService: CategoriaManagmentService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this.isLoading = true;
    this.subscription.add(
      this.categoriaManagmentService
        .listarCategoriasService$()
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            console.log(response);
            this.categorias = response;            
          },
          error: (error) => {
            console.log(error);
            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al listar las categorias'
            );
          },
        })
    );
  }

  showNuevaCategoria(event?: boolean) {
    if (event != undefined) {
      this.isNuevaCategoria = event;
      this.categoria = new CategoriaManagment();
      return;
    }

    this.isNuevaCategoria = !this.isNuevaCategoria;
  }

  editarCategoria(categoria: CategoriaManagment) {
    this.categoria = categoria;
    this.showNuevaCategoria();
  }

  eliminarCategoria(categoria: CategoriaManagment) {
    this.isLoading = true;
    this.subscription.add(
      this.categoriaManagmentService
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
          error: (error) => {
            console.log(error);
            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al eliminar la categoria'
            );
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
