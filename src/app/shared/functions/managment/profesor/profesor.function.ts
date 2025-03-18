import { FormGroup } from "@angular/forms";
import { ProfesorManagment } from "src/app/core/class/managment/managment";
import { NewActivoState } from "src/app/shared/enums";

export const convertToProfesorManagment = (
    profesorForm: FormGroup
): ProfesorManagment => {
    const myProfesor = new ProfesorManagment({
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
    return ProfesorManagment.fromJson(myProfesor);
};