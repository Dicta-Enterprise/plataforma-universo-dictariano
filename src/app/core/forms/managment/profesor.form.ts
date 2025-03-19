import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export const createNuevoProfesorForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        apellido: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required]],
        direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        estado: ['ACTIVO', [Validators.required]],
        imagen: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
    });
};