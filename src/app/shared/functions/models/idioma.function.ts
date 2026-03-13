import { FormGroup } from '@angular/forms';
import { Idioma } from 'src/app/core/class/models';
import { NewActivoState } from '../../enums/activos.enum';

export const convertToIdioma = (
    idiomForm: FormGroup
): Idioma => {
    const myIdioma = new Idioma({
        nombre: idiomForm.get('nombre')?.getRawValue(),
        descripcion: idiomForm.get('descripcion')?.getRawValue(),
        estado: NewActivoState.ACTIVO,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    });

    return myIdioma;
};
