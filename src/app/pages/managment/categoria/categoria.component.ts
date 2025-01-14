import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';

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

  constructor() {}

  ngOnInit(): void {}

  showNuevaCategoria(event?: boolean) {
    if (event != undefined) {
      this.isNuevaCategoria = event;
      return;
    }

    this.isNuevaCategoria = !this.isNuevaCategoria;
  }

  editarCategoria(categoria: CategoriaManagment) {}

  eliminarCategoria(categoria: CategoriaManagment) {}

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
