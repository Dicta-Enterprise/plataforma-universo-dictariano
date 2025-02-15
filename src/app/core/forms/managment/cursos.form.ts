import { FormBuilder, FormGroup } from "@angular/forms";

export const createNuevoCursoForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        nombre: [''],
        descripcion: [''],
        fechaInicio: [''],
        fechaFinalizacion: [''],
        cantidadAlumnos: [0],
        precio: [0],
        estado: ['ACTIVO'],
        imagen: [''],
        video: [''],
        duracion: [0],
        categoriaId: [null],
        profesorId: [null],
        idiomaId: [null],
        planetaId: [null]
    })
}