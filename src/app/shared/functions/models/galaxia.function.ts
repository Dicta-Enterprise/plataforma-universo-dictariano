import { FormGroup } from '@angular/forms';
import { Galaxias } from 'src/app/core/class/models';
import { NewActivoState } from '../../enums/activos.enum';
import { ItemImagen } from 'src/app/core/interfaces/genericas/IItemImagen.interface';

export const convertToGalaxias = (
    galaxiaForm: FormGroup,
    itemImagen: ItemImagen[]
): Galaxias => {
    const myGalaxia = new Galaxias({
        nombre: galaxiaForm.get('nombre')?.getRawValue(),
        estado: NewActivoState.ACTIVO,        
        descripcion: galaxiaForm.get('descripcion')?.getRawValue(),
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        itemImagen: itemImagen,
    });

    return myGalaxia;
};
