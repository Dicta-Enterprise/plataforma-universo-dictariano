import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  model = { email: '', password: '', remember: false,};
  loading = false;
  registeredOk = false;
  showPass=false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // para mostrar un mensajito si viene de registro
    this.registeredOk = this.route.snapshot.queryParamMap.get('registered') === '1';
  }

  async signIn() {
    this.loading = true;
    try {
      await this.auth.login(this.model.email, this.model.password);
      // si quiere recordar, persistimos la sesión “larga”
      this.auth.persistCurrentSession(this.model.remember);
      this.router.navigateByUrl('/');
    } catch (e: any) {
      alert(e?.message || 'No fue posible iniciar sesión');
    } finally {
      this.loading = false;
    }
  }
}
