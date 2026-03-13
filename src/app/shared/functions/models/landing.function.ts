import { FormGroup } from '@angular/forms';
import { LandingPage } from 'src/app/core/class/models/landing-page/Landing.class';
import { NewActivoState } from 'src/app/shared/enums';

// Convierte un formulario en un objeto LandingPage
export const convertToLandingPage = (
  landingForm: FormGroup
): LandingPage => {
  const myLanding = new LandingPage({
    titulo: landingForm.get('titulo')?.getRawValue(),
    descripcion: landingForm.get('descripcion')?.getRawValue(),
    contenido: landingForm.get('contenido')?.getRawValue() || [],
    estado: NewActivoState.ACTIVO,
    planetaId: landingForm.get('planetaId')?.getRawValue(),
    imagenUrl: landingForm.get('imagenUrl')?.getRawValue()?.trim() || undefined,
    color: landingForm.get('color')?.getRawValue()?.trim() || undefined,
  });

  return myLanding;
};
