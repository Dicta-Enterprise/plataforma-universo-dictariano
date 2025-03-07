import { Estandar } from "src/app/shared/class/Estandar";
import { ILanguage } from "../../interfaces/interfaces";

// export const CLANGUAGE_CONSTANT:ILanguage[] = [
//     {
//         id:'1',
//         name:'Español',
//         description:'',
//         createAt:''
//     }
// ]

export const CLANGUAGE_CONSTANT:Estandar[] = [
    new Estandar({ 
        id: '6792d8bd005fc1e6836977f9', 
        descripcion: 'Español' 
    }),

    new Estandar({ 
        id: '6792d8bd005fc1e6836977f9', 
        descripcion: 'Inglés' 
    }),
]