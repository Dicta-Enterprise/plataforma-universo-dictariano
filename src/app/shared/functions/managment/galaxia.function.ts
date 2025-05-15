import { FormGroup } from '@angular/forms';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { NewActivoState } from '../../enums/activos.enum';
import { ItemImagen } from 'src/app/core/interfaces/genericas/IItemImagen.interface';

export const convertToGalaxiaManagment = (
    galaxiaForm: FormGroup,
    itemImagen: ItemImagen[]
): GalaxiaManagment => {
    const myGalaxia = new GalaxiaManagment({
        nombre: galaxiaForm.get('nombre')?.getRawValue(),
        estado: NewActivoState.ACTIVO,        
        descripcion: galaxiaForm.get('descripcion')?.getRawValue(),
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        itemImagen: itemImagen,
    });

    return GalaxiaManagment.toJson(myGalaxia);
};
