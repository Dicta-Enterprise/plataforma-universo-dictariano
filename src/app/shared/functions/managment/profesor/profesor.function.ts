import { FormGroup } from "@angular/forms";
import { Profesor } from "src/app/core/class/models";
import { NewActivoState } from "src/app/shared/enums";

export const convertToProfesorManagment = (
    profesorForm: FormGroup
): Profesor => {
    const myProfesor = new Profesor({
        nombre: profesorForm.get('nombre')?.getRawValue(),
        apellido: profesorForm.get('apellido')?.getRawValue(),
        email: profesorForm.get('email')?.getRawValue(),
        telefono: profesorForm.get('telefono')?.getRawValue(),
        direccion: profesorForm.get('direccion')?.getRawValue(),
        estado: NewActivoState.ACTIVO,
        imagen: profesorForm.get('imagen')?.getRawValue(),
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        fechaNacimiento: profesorForm.get('fechaNacimiento')?.getRawValue(),
    });
    return Profesor.toJson(myProfesor);
};