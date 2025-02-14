import { FormBuilder, FormGroup } from "@angular/forms";

export const createNuevaLandingForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        nombre: [''],
        imagen: [''],
        fechaCreacion: [''],
    })
}