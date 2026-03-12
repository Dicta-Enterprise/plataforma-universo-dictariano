import { FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/core/class/models';
import { ActivosState } from '../../enums';

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

  return Categoria.toJson(myCategoria);
};
