import { ActivosState } from "src/app/shared/enums";
import { PlanetaManagment } from "../managment";

export class LandingPageManagment {
    id: string;
    titulo: string;
    descripcion: string;
    contenido: string[];
    estado: ActivosState;
    planeta: PlanetaManagment;
    imagenUrl: string;
    color: string;

    constructor(landingPage: Partial<LandingPageManagment> = {}) {
        this.id = landingPage.id || '';
        this.titulo = landingPage.titulo || '';
        this.descripcion = landingPage.descripcion || '';
        this.contenido = landingPage.contenido || [];
        this.estado = landingPage.estado || ActivosState.ACTIVO;
        this.planeta = landingPage.planeta || new PlanetaManagment();;
        this.imagenUrl = landingPage.imagenUrl || '';
        this.color = landingPage.color || '';
    }

    static fromJson(landingManagment: any): LandingPageManagment {
        return new LandingPageManagment({
            id: landingManagment.id,
            titulo: landingManagment.titulo,
            descripcion: landingManagment.descripcion,
            contenido: landingManagment.contenido,
            estado: landingManagment.estado,
            planeta: landingManagment.planetaId,
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
            planetaId: landingManagment.planeta,
            imagenUrl: landingManagment.imagenUrl,
            color: landingManagment.color,
        };
    }
}