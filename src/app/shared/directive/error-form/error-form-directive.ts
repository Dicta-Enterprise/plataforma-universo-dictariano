import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[dictaErrorForm]'
})
export class ErrorFormDirective implements OnInit {

  @Input() control!: AbstractControl | null;

  constructor(private el: ElementRef,) {}

  private errorMessages: Record<string, string> = {
    required: 'Este campo es obligatorio',
    email: 'Correo inválido',
    minlength: 'Debe tener al menos 3 caracteres',
    weakPassword: 'La contraseña debe tener mayúscula, minúscula, número y símbolo',
    passwordMismatch: 'Las contraseñas no coinciden'
  };

  ngOnInit(): void {

    if (!this.control) return;

    this.control.statusChanges?.subscribe(() => {
      this.updateError();
    });

    this.updateError();
  }

  private updateError(): void {

    if (!this.control) return;

    if (this.control.touched && this.control.invalid) {
      const errors = this.control.errors;
      if (!errors) return;
      const firstError = Object.keys(errors)[0];
      const message = this.errorMessages[firstError];
      this.el.nativeElement.innerText = message || '';
    } 
    else {
      this.el.nativeElement.innerText = '';
    }
  }
}