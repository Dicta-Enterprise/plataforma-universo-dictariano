import { ActivosState } from "src/app/shared/enums";

export class LandingPageManagment {
    id: string;
    titulo: string;
    descripcion: string;
    contenido: string[];
    estado: ActivosState;
    planetaId: string;
    imagenUrl: string | null;  
    color: string | null;  

    constructor(landingPage: Partial<LandingPageManagment> = {}) {
        this.id = landingPage.id ?? '';
        this.titulo = landingPage.titulo ?? '';
        this.descripcion = landingPage.descripcion ?? '';
        this.contenido = landingPage.contenido ?? [];
        this.estado = landingPage.estado ?? ActivosState.ACTIVO;
        this.planetaId = landingPage.planetaId ?? '';
        this.imagenUrl = landingPage.imagenUrl ?? null;
        this.color = landingPage.color ?? null;
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
            id: landingManagment.id,
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
