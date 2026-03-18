import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';
import { SharedDirectiveModule } from "src/app/shared/directive/shared-directive.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    AuthThemeModule,
    SharedDirectiveModule
]
})
export class LoginModule { }
