export class Estandar {
    id: string;
    descripcion: string;
    activo: boolean;

    constructor(item: Partial<Estandar> = {}) {
        this.id = item.id || '';
        this.descripcion = item.descripcion || '';
        this.activo = item.activo || false;
    }

    static fromJson(itemJson: any): Estandar {
        return new Estandar({
            id: itemJson.id,
            descripcion: itemJson.descripcion,
            activo: itemJson.activo,
        });
    }

    static toJson(item: Estandar): any {
        return {
            id: item.id,
            descripcion: item.descripcion,
            activo: item.activo,
        };
    }
}