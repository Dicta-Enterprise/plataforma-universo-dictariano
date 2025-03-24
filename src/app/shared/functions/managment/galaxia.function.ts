import { FormGroup } from '@angular/forms';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { NewActivoState } from '../../enums/activos.enum';

export const convertToGalaxiaManagment = (
    galaxiaForm: FormGroup
): GalaxiaManagment => {
    const myGalaxia = new GalaxiaManagment({
        nombre: galaxiaForm.get('nombre')?.getRawValue(),
        estado: NewActivoState.ACTIVO,
        imagen: galaxiaForm.get('imagen')?.getRawValue(),
        descripcion: galaxiaForm.get('descripcion')?.getRawValue(),
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    });

    return GalaxiaManagment.toJson(myGalaxia);
};
