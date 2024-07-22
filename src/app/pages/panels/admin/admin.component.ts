import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

   menuAdmin = [
    {
      Plataforma:[
        {
          name:'Dashboard',
          icon:'pi pi-home',
          color:'blue',
          hex:'#0000ff',
          route:'/dashboard'
        },
        {
          name:'Marcadores',
          icon:'pi pi-favorites',
          color:'yellow',
          hex:'#0550ff',
          route:'/marcadores'
        },
      ]
    },
    {
      Cursos:[
        {
          name:'Nuevo Curso',
          icon:'pi pi-plus',
          color:'blue',
          hex:'#0000ff',
          route:'/new-course'
        },
      ]
    },
   ]
}
