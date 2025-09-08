import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  model = { nombre: '', email: '', password: '', aceptaTyC: false };
  loading = false;
  showPass= false

  constructor(private auth: AuthService, private router: Router) {}

  async registrarme() {
    if (!this.model.aceptaTyC) {
      alert('Debes aceptar Términos y Condiciones');
      return;
    }
    this.loading = true;
    try {
      await this.auth.register(this.model.nombre, this.model.email, this.model.password);
      // Redirige al login para que se pueda loguear con la cuenta creada
      this.router.navigate(['/auth/login'], { queryParams: { registered: 1 } });
    } catch (e: any) {
      alert(e?.message || 'No fue posible registrarte');
    } finally {
      this.loading = false;
    }
  }
}
