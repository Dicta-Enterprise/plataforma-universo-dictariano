import { FormGroup } from '@angular/forms';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { ActivosState } from '../../enums';

export const convertToCategoriaManagment = (
  categoriaForm: FormGroup
): CategoriaManagment => {
  const myCategoria = new CategoriaManagment({
    nombre: categoriaForm.get('nombre')?.getRawValue(),
    descripcion: categoriaForm.get('descripcion')?.getRawValue(),
    estado: ActivosState.ACTIVO,
    imagen: categoriaForm.get('imagen')?.getRawValue(),
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
  });

  return CategoriaManagment.toJson(myCategoria);
};
