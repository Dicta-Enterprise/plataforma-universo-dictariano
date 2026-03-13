import { FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/core/class/models';

export const convertToCategorias = (
  categoriaForm: FormGroup
): Categoria => {
  const myCategoria = new Categoria({
    nombre: categoriaForm.get('nombre')?.getRawValue(),
    descripcion: categoriaForm.get('descripcion')?.getRawValue(),
    estado: true,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
  });

  return myCategoria;
};
