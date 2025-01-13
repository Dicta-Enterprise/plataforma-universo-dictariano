import { Component } from '@angular/core';
import { C_MENU_MANAGMENT_I } from 'src/app/core/constants/menus/CMenuManagmentI.constant';
import { IMenu } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class ManagmentComponent {


   menus:IMenu[] = C_MENU_MANAGMENT_I;
  

}
