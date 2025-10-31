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
  @Input() category!: 'todos'|'ninos'|'jovenes'|'padres';
  @Input() bg_color = '#1F2F4A';
  @Input() primary_color = '#15b6cf';
  @Input() secondary_color = '#235E66';
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


