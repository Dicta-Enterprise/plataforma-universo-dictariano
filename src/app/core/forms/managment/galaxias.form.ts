import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const createNuevaGalaxiaform = (
  formBuilder: FormBuilder
): FormGroup => {
  return formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(60)]],  
    descripcion: ['', [Validators.required, Validators.maxLength(200)]],  
    imagen: ['', [Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/)]]
  });
};
