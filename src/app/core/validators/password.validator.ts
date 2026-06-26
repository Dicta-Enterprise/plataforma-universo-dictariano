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
    const confirmControl = form.get(confirmPasswordKey);
    const passwordControl = form.get(passwordKey);

    if (!password || !confirmPassword) return null;

    if (!passwordRegex.test(password)) {
      passwordControl?.setErrors({ weakPassword: true }); 
      return null;
    } else {
      passwordControl?.setErrors(null);
    }

    if (password !== confirmPassword) {
      confirmControl?.setErrors({ passwordMismatch: true }); 
      return null;
    } else {
      confirmControl?.setErrors(null);
    }

    return null;
  };
}