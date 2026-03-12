import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/core/class/models/categoria/Categoria.class';
import { Cursos } from 'src/app/core/class/models/cursos/Cursos.class';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/models/categoria-facade';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';

@Component({
  selector: 'app-cursos-padres',
  templateUrl: './cursos-padres.component.html',
})
export class CursosPadresComponent implements OnInit {
  cursos: Cursos[] = [];
  /*
  ngOnInit(): void {
    this.cursos = CCURSO_CONSTANT.filter(curso => curso.categoria === 'padres');
  }*/
  cursos$ = this.cursoFacade.cursos$;
  categorias$ = this.categoriaFacade.categorias$;
  categoria_id = '';

  categorias_observable = this.categorias$.asObservable();
  cursos_observable = this.cursos$.asObservable();

  constructor(private readonly cursoFacade:CursoFacade, private readonly categoriaFacade: CategoriaFacade) {
    this.categorias_observable.subscribe(value => {
      value.map((cat:Categoria) => {
        if(cat.nombre.toLowerCase().replace('ñ','n') == 'padres'){
          this.categoria_id = cat.id;
        }
      });
    });
    this.cursos_observable.subscribe(value => {
      this.cursos = value.filter((curso:Cursos) => curso.categoriaId == this.categoria_id);
    });
    
  }

  ngOnInit() {
    this.categoriaFacade.listarCategorias();
    this.cursoFacade.listarCursos();

      
  }
}