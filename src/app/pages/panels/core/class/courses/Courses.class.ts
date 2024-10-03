export class Courses {
    nombre: string;
    fechaCreacion: string;
    precio: number;
    categoria: string;
    idiomas: string;
    tipoCurso: string;
    descripcion: string;
    estado:boolean;

    constructor() {
        this.nombre = '';
        this.fechaCreacion = '';
        this.precio = 0;
        this.categoria = '';
        this.idiomas = '';
        this.tipoCurso = '';
        this.descripcion = '';
        this.estado = false;
    }
}