import { FormBuilder, FormGroup } from "@angular/forms";



export const createNuevaCategoriaForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        nombre: [''],
        imagen: [''],
        fechaCreacion: [''],
    })
}