import { Component, Input, OnInit } from '@angular/core';
import { CursoFacade } from '../../patterns/facade/models/curso-facade';
import { Categoria, Cursos } from 'src/app/core/class/models';
import { CategoriaFacade } from '../../patterns/facade/models/categoria-facade';


@Component({
  selector: 'app-course-carousel',
  templateUrl: './course-carousel.component.html',
  styleUrls: ['./course-carousel.component.css']
})
export class CourseCarouselComponent implements OnInit {

  @Input() category!: 'todos' | 'ninos' | 'jovenes' | 'padres'; //colocar la categoría a la que pertenece la card actual
  @Input() bg_color = '#1F2F4A'; //color de fondo para cada card
  @Input() primary_color = '#15b6cf';//color primario (el del titulo, parte del boton principal, sombra de la card y flechas)
  @Input() secondary_color = '#235E66';//color secundario (boton de compra y degradado en boton principal)

  cursos: Cursos[] = [];

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1320px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1200px', numVisible: 2, numScroll: 1 },
    { breakpoint: '992px', numVisible: 2, numScroll: 1 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];
  cursos$ = this.cursoFacade.cursos$;
  categorias$ = this.categoriaFacade.categorias$;
  categoria_id = '';

  categorias_observable = this.categorias$.asObservable();
  cursos_observable = this.cursos$.asObservable();

  constructor(private readonly cursoFacade: CursoFacade, private readonly categoriaFacade: CategoriaFacade) {
    this.categorias_observable.subscribe(() => {
      this.categorias$.value.map((cat: Categoria) => {
        if (cat.nombre.toLowerCase().replace('ñ', 'n') == this.category) {
          this.categoria_id = cat.id;
        }
      });
    });
    this.cursos_observable.subscribe(value => {
      this.cursos = value.filter((curso: Cursos) => curso.categoriaId == this.categoria_id);
    });

  }

  private setColorsByCategory() {
    switch (this.category) {
      case 'ninos':
        this.primary_color = '#33FF66';
        this.secondary_color = '#156B2B';
        break;

      case 'jovenes':
        this.primary_color = 'rgb(255, 204, 0)';
        this.secondary_color = '#b38f00';
        break;

      case 'padres':
        this.primary_color = '#33CCFF';
        this.secondary_color = '#1a8fb3';
        break;

      default:
        this.primary_color = '#15b6cf';
        this.secondary_color = '#235E66';
    }
  }


  ngOnInit() {
    this.categoriaFacade.listarCategorias();
    this.cursoFacade.listarCursos();
    this.setColorsByCategory();

    /*
    of(this.cursos$.value.map(CursoManagment.fromJson))
      .pipe(
        
      )
      .subscribe(filtered => {
        console.log('Cursos en carousel:', filtered);
        //this.cursos = this.cursos$.value;
      });
*/

  }

}


