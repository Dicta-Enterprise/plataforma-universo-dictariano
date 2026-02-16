import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordValidator(
  passwordKey: string,
  confirmPasswordKey: string
) {

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordKey)?.value;
    const confirmPassword = form.get(confirmPasswordKey)?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    if (password && !passwordRegex.test(password)) {
      return { weakPassword: true };
    }

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}


