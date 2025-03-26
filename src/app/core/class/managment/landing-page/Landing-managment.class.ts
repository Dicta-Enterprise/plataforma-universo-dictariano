import { NewActivoState } from "src/app/shared/enums";

export class LandingPageManagment {
    id: string;
    titulo: string;
    descripcion: string;
    contenido: string[];
    estado: NewActivoState;
    planetaId: string;
    imagenUrl: string | null; // Null - opcional :'D, preferible no usar null
    color: string | null;

    constructor(landingPage: Partial<LandingPageManagment> = {}) {
        this.id = landingPage.id ?? '';
        this.titulo = landingPage.titulo ?? '';
        this.descripcion = landingPage.descripcion ?? '';
        this.contenido = landingPage.contenido ?? [];
        this.estado = landingPage.estado ?? NewActivoState.ACTIVO;
        this.planetaId = landingPage.planetaId ?? '';
        this.imagenUrl = landingPage.imagenUrl?.trim() || null; 
        this.color = landingPage.color?.trim() || null; 
    }

    static fromJson(landingManagment: any): LandingPageManagment {
        return new LandingPageManagment({
            id: landingManagment.id,
            titulo: landingManagment.titulo,
            descripcion: landingManagment.descripcion,
            contenido: landingManagment.contenido,
            estado: landingManagment.estado,
            planetaId: landingManagment.planetaId,
            imagenUrl: landingManagment.imagenUrl,
            color: landingManagment.color,
        });
    }

    static toJson(landingManagment: LandingPageManagment): any {
        return {
            titulo: landingManagment.titulo,
            descripcion: landingManagment.descripcion,
            contenido: landingManagment.contenido,
            estado: landingManagment.estado,
            planetaId: landingManagment.planetaId,
            imagenUrl: landingManagment.imagenUrl,
            color: landingManagment.color,
        };
    }
}
