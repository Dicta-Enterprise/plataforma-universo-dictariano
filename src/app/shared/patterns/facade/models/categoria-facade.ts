import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Categoria } from 'src/app/core/class/models';
import { CategoriaService } from 'src/app/core/services/models/categoria/categoria.service';
import { AlertService } from 'src/app/shared/services/alert.service';

export interface CategoriaUI {
  label: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaFacade {
  categorias$ = new BehaviorSubject<Categoria[]>([]);
  categoria$ = new BehaviorSubject<Categoria>(new Categoria());

  readonly categoryMap$: Observable<Record<string, CategoriaUI>> =
    this.categorias$.pipe(
      map(cats => {
        const colorMap: Record<string, string> = {
          ninos:   '#33FF66',
          jovenes: 'rgb(255, 204, 0)',
          padres:  '#33CCFF',
        };
        const defaultColor = '#33CCFF';

        return cats.reduce<Record<string, CategoriaUI>>((acc, cat) => {
          const key = cat.nombre.toLowerCase().replace('ñ', 'n');
          acc[cat.id] = {
            label: cat.nombre,
            color: colorMap[key] ?? defaultColor,
          };
          return acc;
        }, {});
      })
    );

  readonly defaultCategory: CategoriaUI = { label: 'Público', color: '#33CCFF' };

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly alertService: AlertService
  ) {}

  listarCategorias(): void {
    this.categoriaService.listarCategoriasService$().subscribe({
      next: (response) => {
        this.categorias$.next(response);
        this.alertService.showSuccess('Exito', 'Categorias cargadas');
      },
    });
  }

  getCategoryById(categoriaId: string): CategoriaUI {
    const map = this.buildCategoryMap(this.categorias$.value);
    return map[categoriaId] ?? this.defaultCategory;
  }

  private buildCategoryMap(cats: Categoria[]): Record<string, CategoriaUI> {
    const colorMap: Record<string, string> = {
      ninos:   '#33FF66',
      jovenes: 'rgb(255, 204, 0)',
      padres:  '#33CCFF',
    };
    return cats.reduce<Record<string, CategoriaUI>>((acc, cat) => {
      const key = cat.nombre.toLowerCase().replace('ñ', 'n');
      acc[cat.id] = { label: cat.nombre, color: colorMap[key] ?? '#33CCFF' };
      return acc;
    }, {});
  }
}