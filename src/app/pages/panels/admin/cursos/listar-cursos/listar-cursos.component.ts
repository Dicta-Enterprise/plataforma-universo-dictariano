import { Component } from '@angular/core';
import { Courses } from '../../../core/class/courses/Courses.class';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent {

  isLoadingTable:boolean = false
  cursos:Courses[] = []


  clearTable(table:Table){
    table.clear()
  }


  getSeverity(status: string) {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
        default:
            return 'dark';
    }
}



}
