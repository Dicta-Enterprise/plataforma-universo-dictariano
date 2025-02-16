import { FormBuilder, FormGroup } from "@angular/forms";

export const createNuevaLandingForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        titulo: [''],
        descripcion: [''],
        contenido: [[]], 
        planetaId: [''], 
        estado: ['ACTIVO'],
        imagenUrl: [null], 
        color: [null] 
    });
};