import { Component } from '@angular/core';
import { C_MENU_MODELS_I as C_MENU_MODELS_I } from 'src/app/core/constants/menus/CMenuManagmentI.constant';
import { IMenu } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent {


   menus:IMenu[] = C_MENU_MODELS_I;
  

}
