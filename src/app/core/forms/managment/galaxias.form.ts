import { FormBuilder, FormGroup } from '@angular/forms';

export const createNuevaGalaxiaform = (
  formBuilder: FormBuilder
): FormGroup => {
  return formBuilder.group({
    nombre: [''],
    imagen: [''],
  });
};
