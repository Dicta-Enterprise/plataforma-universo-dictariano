import { FormGroup } from '@angular/forms';
import { Cursos } from 'src/app/core/class/models';
import { ActivosState, NewActivoState } from 'src/app/shared/enums';

export const convertToCursos = (
  cursoForm: FormGroup
): Cursos => {
  const myCurso = new Cursos({
    nombre: cursoForm.get('nombre')?.getRawValue(),
    descripcion: cursoForm.get('descripcion')?.getRawValue(),
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
    fechaInicio: cursoForm.get('fechaInicio')?.getRawValue(),
    fechaFinalizacion: cursoForm.get('fechaFinalizacion')?.getRawValue(),
    cantidadAlumnos: cursoForm.get('cantidadAlumnos')?.getRawValue(),
    precio: cursoForm.get('precio')?.getRawValue(),
    estado: NewActivoState.ACTIVO,
    imagen: cursoForm.get('imagen')?.getRawValue(),
    video: cursoForm.get('video')?.getRawValue(),
    duracion: cursoForm.get('duracion')?.getRawValue(),
    categoriaId: cursoForm.get('categoriaId')?.getRawValue(),
    profesorId: cursoForm.get('profesorId')?.getRawValue(),
    idiomaId: cursoForm.get('idiomaId')?.getRawValue(),
    planetaId: cursoForm.get('planetaId')?.getRawValue(),
  });

  return Cursos.toJson(myCurso);
};
