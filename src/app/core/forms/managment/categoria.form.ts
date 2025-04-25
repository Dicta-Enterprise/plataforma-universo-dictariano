import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const createNuevaCategoriaForm = (
  formBuilder: FormBuilder
): FormGroup => {
  return formBuilder.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });
};
