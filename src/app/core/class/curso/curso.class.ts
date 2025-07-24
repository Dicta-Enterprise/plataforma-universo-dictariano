import { Item } from "src/app/shared/class/Item.class";

export class Curso {
    public id: number;
    public nombre: string;
    public descripcion: string;
    public categoria: 'ninos' | 'jovenes' | 'padres';
    public beneficios: string[];
    public imagen: string;
    
     constructor(item: Partial<Curso> = {}) {
        this.id = item.id ?? 0;
        this.nombre = item.nombre ?? '';
        this.descripcion = item.descripcion ?? '';
        this.categoria = item.categoria ?? 'ninos';
        this.beneficios = item.beneficios ?? [];
        this.imagen = item.imagen ?? '';
    }

    // Response 1
    static fromJson(itemJson: any): Curso {
        return new Curso({
            id: itemJson.id,
            nombre: itemJson.nombre,
            descripcion: itemJson.descripcion,
            categoria: itemJson.categoria,
            beneficios: itemJson.beneficios,
            imagen: itemJson.imagen,
        });
    }

    // Response 2
    static fromJsonV2(itemJson: any): Curso {
        return new Curso({
            id: itemJson.id,
            nombre: itemJson.nombre,
            descripcion: itemJson.descripcion,
            categoria: itemJson.categoria,
        });

    }

    
    static toJson(item: Curso): any {
        return {
            id: item.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            categoria: item.categoria,
            beneficios:item.beneficios,
            imagen: item.imagen,
        };
    }

}




