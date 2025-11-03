import { Component, Input, OnInit }   from '@angular/core';
import { CursoFacade } from '../../patterns/facade/managment/curso-facade';
import { CategoriaManagment, CursoManagment } from 'src/app/core/class/managment/managment';
import { CategoriaFacade } from '../../patterns/facade/managment/categoria-facade';

@Component({
  selector: 'app-course-carousel',
  templateUrl: './course-carousel.component.html'
})
export class CourseCarouselComponent implements OnInit {
  @Input() category!: 'todos'|'ninos'|'jovenes'|'padres';
  cursos: CursoManagment[] = [];
  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1320px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1200px', numVisible: 2, numScroll: 1 },
    { breakpoint: '992px',  numVisible: 2, numScroll: 1 },
    { breakpoint: '768px',  numVisible: 1, numScroll: 1 },
    { breakpoint: '560px',  numVisible: 1, numScroll: 1 }
  ];
  cursos$ = this.cursoFacade.cursos$;
  categorias$ = this.categoriaFacade.categorias$;
  categoria_id = '';

  categorias_observable = this.categorias$.asObservable();
  cursos_observable = this.cursos$.asObservable();

  constructor(private readonly cursoFacade:CursoFacade, private readonly categoriaFacade: CategoriaFacade) {
    this.categorias_observable.subscribe(() => {
      this.categorias$.value.map((cat:CategoriaManagment) => {
        if(cat.nombre.toLowerCase().replace('ñ','n') == this.category){
          this.categoria_id = cat.id;
        }
      });
    });
    this.cursos_observable.subscribe(value => {
      this.cursos = value.filter((curso:CursoManagment) => curso.categoriaId == this.categoria_id);
    });
    
  }

  ngOnInit() {
    this.categoriaFacade.listarCategorias();
    this.cursoFacade.listarCursos();

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


