import { ActivosState } from "src/app/shared/enums";
import { Categoria } from "../../class/models";


export const CCATEGORIA_CONSTANT:Categoria[] = [
    new Categoria({
        id: '1',
        nombre: 'Padres',
        estado: true, //ActivosState.ACTIVO
        imagenUrl: '',
        fechaCreacion: new Date(),
    }),
    new Categoria({
        id: '1',
        nombre: 'Padres',
        estado: false, //ActivosState.INACTIVO
        imagenUrl: '',
        fechaCreacion: new Date(),
    })
];