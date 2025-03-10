import { FormGroup } from '@angular/forms';
import { CursoManagment } from 'src/app/core/class/managment/managment';
import { ActivosState } from 'src/app/shared/enums';

export const convertToCursoManagment = (
  cursoForm: FormGroup
): CursoManagment => {
  const myCurso = new CursoManagment({
    nombre: cursoForm.get('nombre')?.getRawValue(),
    descripcion: cursoForm.get('descripcion')?.getRawValue(),
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
    fechaInicio: cursoForm.get('fechaInicio')?.getRawValue(),
    fechaFinalizacion: cursoForm.get('fechaFinalizacion')?.getRawValue(),
    cantidadAlumnos: cursoForm.get('cantidadAlumnos')?.getRawValue(),
    precio: cursoForm.get('precio')?.getRawValue(),
    estado: ActivosState.ACTIVO,
    imagen: cursoForm.get('imagen')?.getRawValue(),
    video: cursoForm.get('video')?.getRawValue(),
    duracion: cursoForm.get('duracion')?.getRawValue(),
    categoriaId: cursoForm.get('categoriaId')?.getRawValue(),
    profesorId: cursoForm.get('profesorId')?.getRawValue(),
    idiomaId: cursoForm.get('idiomaId')?.getRawValue(),
    planetaId: cursoForm.get('planetaId')?.getRawValue(),
  });

  return CursoManagment.toJson(myCurso);
};
