import { Component, OnInit } from '@angular/core';
import { CategoriaManagment } from 'src/app/core/class/managment/categoria/Categoria-managment.class';
import { CursoManagment } from 'src/app/core/class/managment/cursos/Cursos-managment.class';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/managment/categoria-facade';
import { CursoFacade } from 'src/app/shared/patterns/facade/managment/curso-facade';

@Component({
  selector: 'app-cursos-padres',
  templateUrl: './cursos-padres.component.html',
})
export class CursosPadresComponent implements OnInit {
  cursos: CursoManagment[] = [];
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
      value.map((cat:CategoriaManagment) => {
        if(cat.nombre.toLowerCase().replace('ñ','n') == 'padres'){
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

      
  }
}