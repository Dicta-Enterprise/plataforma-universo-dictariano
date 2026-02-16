import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    AuthThemeModule
  ]
})
export class LoginModule { }
