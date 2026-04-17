import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function createPerfilForm(fb: FormBuilder): FormGroup {
  return fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });
}

export function createPasswordForm(fb: FormBuilder): FormGroup {
  return fb.group({
    passwordAnterior: ['', [Validators.required]],
    passwordNueva: ['', [Validators.required, Validators.minLength(6)]],
    passwordRepetir: ['', [Validators.required]],
  });
}