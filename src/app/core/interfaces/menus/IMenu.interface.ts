export interface IMenuReponsesDto {
    id:string;
    nombre:string;
    ruta?:string;
    icono:string;
    color:string;
    subMenu?:IMenuReponsesDto[];
}