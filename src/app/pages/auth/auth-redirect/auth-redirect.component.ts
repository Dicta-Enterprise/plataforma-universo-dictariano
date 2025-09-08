import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-auth-redirect',
  template: `
    <div class="min-h-[60vh] flex align-items-center justify-content-center">
      <div class="text-center">
        <i class="pi pi-spin pi-spinner text-4xl text-cyan-400 mb-3"></i>
        <p class="text-300">Procesando tu inicio de sesión...</p>
      </div>
    </div>
  `
})
export class AuthRedirectComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  async ngOnInit() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras?.state || {}) as { email?: string; password?: string };
    try {
      await this.auth.loginAsync(state.email!, state.password!);
      this.router.navigateByUrl(returnUrl);
    } catch {
      alert('No se pudo iniciar sesión. Verifica las credenciales.');
      this.router.navigate(['/auth/login']);
    }
  }
}
