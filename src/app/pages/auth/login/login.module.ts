import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import{DividerModule} from'primeng/divider';
@NgModule({
  declarations: [
    //Componentes
    LoginComponent
  ],
  imports: [
    //Modulos
    CommonModule,
    LoginRoutingModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    DividerModule
  ]
})
export class LoginModule { }
