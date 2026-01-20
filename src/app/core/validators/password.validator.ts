import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordValidator(
  passwordKey: string,
  confirmPasswordKey: string
) {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordKey)?.value;
    const confirmPassword = form.get(confirmPasswordKey)?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  };
}


