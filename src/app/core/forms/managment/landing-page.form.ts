import { FormBuilder, FormGroup } from "@angular/forms";

export const createNuevaLandingForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        titulo: [''],
        descripcion: [''],
        contenido: [[]], 
        estado: ['ACTIVO'],
        planetaId: [''], 
        imagenUrl: [null], 
        color: [null] 
    });
};