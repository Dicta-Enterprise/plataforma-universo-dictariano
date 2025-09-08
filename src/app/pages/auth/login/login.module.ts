import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import{DividerModule} from'primeng/divider';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    //Modulos
    CommonModule,
    LoginRoutingModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    FormsModule
  ]
})
export class LoginModule { }
