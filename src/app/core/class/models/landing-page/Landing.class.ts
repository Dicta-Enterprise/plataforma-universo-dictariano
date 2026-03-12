import { NewActivoState } from "src/app/shared/enums";

export class LandingPage {
    id: string;
    titulo: string;
    descripcion: string;
    contenido: string[];
    estado: NewActivoState;
    planetaId: string;
    imagenUrl: string | null; // Null - opcional :'D, preferible no usar null
    color: string | null;

    constructor(landingPage: Partial<LandingPage> = {}) {
        this.id = landingPage.id ?? '';
        this.titulo = landingPage.titulo ?? '';
        this.descripcion = landingPage.descripcion ?? '';
        this.contenido = landingPage.contenido ?? [];
        this.estado = landingPage.estado ?? NewActivoState.ACTIVO;
        this.planetaId = landingPage.planetaId ?? '';
        this.imagenUrl = landingPage.imagenUrl?.trim() || null; 
        this.color = landingPage.color?.trim() || null; 
    }

    static fromJson(landingPage: unknown): LandingPage {
        const casted = landingPage as Record<string, unknown>;
        return new LandingPage({
            id: casted['id'] as string,
            titulo: casted['titulo'] as string,
            descripcion: casted['descripcion'] as string,
            contenido: casted['contenido'] as string[],
            estado: casted['estado'] as NewActivoState,
            planetaId: casted['planetaId'] as string,
            imagenUrl: casted['imagenUrl'] as string | null,
            color: casted['color'] as string | null,
        });
    }

    static toJson(landingPage: LandingPage): unknown {
        return {
            titulo: landingPage.titulo,
            descripcion: landingPage.descripcion,
            contenido: landingPage.contenido,
            estado: landingPage.estado,
            planetaId: landingPage.planetaId,
            imagenUrl: landingPage.imagenUrl,
            color: landingPage.color,
        };
    }
}
