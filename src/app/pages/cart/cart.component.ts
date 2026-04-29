import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';
import { Cursos } from 'src/app/core/class/models/cursos/Cursos.class';
import { Categoria } from 'src/app/core/class/models';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/models/categoria-facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  steps: MenuItem[] = [];
  cursosSugeridos: Cursos[] = [];
  categorias: Categoria[] = [];
  categoryMap: Record<string, { label: string; color: string }> = {};
  defaultCategory = {
    label: 'Público',
    color: '#33CCFF'
  };

  stars = [1, 2, 3, 4, 5];

  idUsuario = 1;

  constructor(
    public cart: CartService,
    private cursoFacade: CursoFacade,
    private categoriaFacade: CategoriaFacade
  ) { }

  ngOnInit() {
    this.categoriaFacade.listarCategorias();

    this.categoriaFacade.categorias$.asObservable().subscribe(cats => {
      this.categorias = cats;

      cats.forEach(cat => {
        const key = cat.nombre.toLowerCase().replace('ñ', 'n');

        const colorMap: Record<string, string> = {
          'ninos': '#33FF66',
          'jovenes': 'rgb(255, 204, 0)',
          'padres': '#33CCFF'
        };

        this.categoryMap[cat.id] = {
          label: cat.nombre, // "Niños"
          color: colorMap[key] || '#33CCFF'
        };
      });
    });

    this.steps = [
      { label: 'Detalles del carrito' },
      { label: 'Inicia sesión' },
      { label: 'Proceder al pago' }
    ];
    this.cursoFacade.listarCursos();
    this.cursoFacade.cursos$.asObservable().subscribe(cursos => {
      this.cursosSugeridos = cursos.slice(0, 4);
    });
  }

  remove(id: number) {
    this.cart.removeFromCart(id);
  }

  getStarClass(rating: number, star: number) {
    return star <= Math.round(rating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
  }

  enviarCarrito() {
    const cursos = this.cart.items.map(curso => ({ idcurso: String(curso.id) }));
    this.cart.createCarrito(this.idUsuario, cursos).subscribe({
      next: () => {
        alert('Carrito guardado en el backend');
      },
      error: () => {
        alert('Error al guardar el carrito');
      }
    });

  }

}