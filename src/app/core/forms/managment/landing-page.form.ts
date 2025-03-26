import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Función para crear el formulario de nueva landing page
export const createNuevaLandingForm = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
        titulo: ['', [Validators.required, Validators.maxLength(60)]], 
        descripcion: ['', [Validators.required, Validators.maxLength(200)]],
        contenido: [[], [Validators.required]],
        estado: ['ACTIVO'],
        planetaId: ['', [Validators.required]],
        // Es preferible evitar el uso de null (en mi caso son opcionales y por eso las declaré así :,D)
        imagenUrl: [null, [Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/)]],
        color: [null, [Validators.pattern(/^#([0-9A-Fa-f]{3}){1,2}$/)]]
    });
};