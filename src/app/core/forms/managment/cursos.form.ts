import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export const createNuevoCursoForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        fechaInicio: ['', [Validators.required]],
        fechaFinalizacion: ['', [Validators.required]],
        cantidadAlumnos: [0, [Validators.required, Validators.min(1)]],
        precio: [0, [Validators.required, Validators.min(1)]],
        estado: ['ACTIVO'],
        imagen: ['', [Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/)]],
        video: ['', [Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:mp4|avi|mkv|webm|ogg)/)]],
        categoriaId: [null],
        profesorId: [null],
        idiomaId: [null],
        planetaId: [null]
    })
}