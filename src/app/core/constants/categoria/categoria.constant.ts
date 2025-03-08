import { ActivosState } from "src/app/shared/enums";
import { CategoriaManagment } from "../../class/managment/managment";


export const CCATEGORIA_CONSTANT:CategoriaManagment[] = [
    new CategoriaManagment({
        id: '1',
        nombre: 'Padres',
        estado: ActivosState.ACTIVO,
        imagen: '',
        fechaCreacion: new Date(),
    }),
    new CategoriaManagment({
        id: '1',
        nombre: 'Padres',
        estado: ActivosState.INACTIVO,
        imagen: '',
        fechaCreacion: new Date(),
    })
];