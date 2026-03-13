import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const createNuevoIdiomaform = (
  formBuilder: FormBuilder
): FormGroup => {
  return formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(60)]],  
    descripcion: ['', [Validators.required, Validators.maxLength(200)]],  
  });
};
