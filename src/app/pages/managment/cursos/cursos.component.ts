import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent  implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  isNuevoCurso: boolean = false;
  cursos: any[] = [];//TODO: TIPAR
  curso: any = {};//TODO: TIPAR




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
