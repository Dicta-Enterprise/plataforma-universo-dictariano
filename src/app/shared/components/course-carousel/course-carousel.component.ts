import { Component, Input, OnInit }   from '@angular/core';
import { of }                         from 'rxjs';
import { map }                        from 'rxjs/operators';
import { Curso }                      from 'src/app/core/class/curso/curso.class';
import { CCURSO_CONSTANT } from 'src/app/core/constants/courses/CCurso.constant';

@Component({
  selector: 'app-course-carousel',
  templateUrl: './course-carousel.component.html'
})
export class CourseCarouselComponent implements OnInit {
  @Input() category!: 'todos'|'ninos'|'jovenes'|'padres'; //colocar la categoría a la que pertenece la card actual
  @Input() bg_color = '#1F2F4A'; //color de fondo para cada card
  @Input() primary_color = '#15b6cf';//color primario (el del titulo, parte del boton principal, sombra de la card y flechas)
  @Input() secondary_color = '#235E66';//color secundario (boton de compra y degradado en boton principal)
  cursos: Curso[] = [];
  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1320px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1200px', numVisible: 2, numScroll: 1 },
    { breakpoint: '992px',  numVisible: 2, numScroll: 1 },
    { breakpoint: '768px',  numVisible: 1, numScroll: 1 },
    { breakpoint: '560px',  numVisible: 1, numScroll: 1 }
  ];


  ngOnInit() {

    of(CCURSO_CONSTANT.map(Curso.fromJson))
      .pipe(
        map(all =>
          all.filter(c =>
            this.category === 'todos' ? true : c.categoria === this.category
          )
        )
      )
      .subscribe(filtered => {
        //console.log('Cursos en carousel:', filtered);
        this.cursos = filtered;
      });

      
  }
  
}


