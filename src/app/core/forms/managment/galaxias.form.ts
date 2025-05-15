import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const createNuevaGalaxiaform = (
  formBuilder: FormBuilder,

  cantidadImagenes: number
): FormGroup => {
  const imagenesFormArray = formBuilder.array(
    Array.from({ length: cantidadImagenes }).map(() =>
      formBuilder.group({
        url: ['', Validators.required],
        id: ['', Validators.required],
        categoria: ['', Validators.required],
      })
    )
  );

  return formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(60)]],
    descripcion: ['', [Validators.required, Validators.maxLength(200)]],
    imagenes: imagenesFormArray,
  });
};
