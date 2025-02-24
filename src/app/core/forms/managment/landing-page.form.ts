import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export const createNuevaLandingForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        titulo: ['', [Validators.required, Validators.maxLength(60)]], 
        descripcion: ['', [Validators.required, Validators.maxLength(200)]],
        contenido: [[], [Validators.required]],
        estado: ['ACTIVO'],
        planetaId: ['', [Validators.required]],
        imagenUrl: [null, [Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/)]],
        color: [null, [Validators.pattern(/^#([0-9A-Fa-f]{3}){1,2}$/)]]
    });
};