export class Estandar {
    public id: string;
    public descripcion: string;
    public activo: boolean;

    constructor(item: Partial<Estandar> = {}) {
        this.id = item.id || '';
        this.descripcion = item.descripcion || '';
        this.activo = item.activo || false;
    }

    //se usa cuando hacemos solicitudes a API -- response
    static fromJson(itemJson: any): Estandar {
        return new Estandar({
            id: itemJson.id,
            descripcion: itemJson.descripcion,
            activo: itemJson.activo,
        });
    }

    //Se usa cuando enviamos datos a la API -- request
    static toJson(item: Estandar): any {
        return {
            id: item.id,
            descripcion: item.descripcion,
            activo: item.activo,
        };
    }
}