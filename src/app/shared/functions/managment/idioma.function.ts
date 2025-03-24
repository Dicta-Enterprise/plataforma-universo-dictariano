import { FormGroup } from '@angular/forms';
import { IdiomaManagment } from 'src/app/core/class/managment/managment';
import { NewActivoState } from '../../enums/activos.enum';

export const convertToIdiomaManagment = (
    idiomForm: FormGroup
): IdiomaManagment => {
    const myIdioma = new IdiomaManagment({
        nombre: idiomForm.get('nombre')?.getRawValue(),
        descripcion: idiomForm.get('descripcion')?.getRawValue(),
        estado: NewActivoState.ACTIVO,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    });

    return IdiomaManagment.toJson(myIdioma);
};
