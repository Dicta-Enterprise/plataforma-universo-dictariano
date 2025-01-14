import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { CursoManagment } from 'src/app/core/class/managment/managment';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent  implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  isNuevoCurso: boolean = false;
  cursos: CursoManagment[] = [];
  curso: CursoManagment = new CursoManagment();




  buscarCursoForm:FormGroup


  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
      
  }

  showNuevoCurso(event?:boolean) {
    if(event != undefined){
      this.isNuevoCurso = event;
      return
    }

    this.isNuevoCurso = !this.isNuevoCurso;
  }
  


  buscarCurso(){}

  editarCurso(curso:any){}


  eliminarCurso(curso:any){}

  clear(table:Table){
    table.clear();
  }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }




}
