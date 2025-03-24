import { FormGroup } from '@angular/forms';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';
import { NewActivoState } from 'src/app/shared/enums';

export const convertToLandingPageManagment = (
  landingForm: FormGroup
): LandingPageManagment => {
  const myLanding = new LandingPageManagment({
    titulo: landingForm.get('titulo')?.getRawValue(),
    descripcion: landingForm.get('descripcion')?.getRawValue(),
    contenido: landingForm.get('contenido')?.getRawValue() || [],
    estado: NewActivoState.ACTIVO,
    planetaId: landingForm.get('planetaId')?.getRawValue(),
    imagenUrl: landingForm.get('imagenUrl')?.getRawValue()?.trim() || undefined,
    color: landingForm.get('color')?.getRawValue()?.trim() || undefined,
  });

  return LandingPageManagment.toJson(myLanding);
};
