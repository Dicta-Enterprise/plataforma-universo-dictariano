export interface ICursoCarritoPayload {
  idcurso: string;
  nombrecurso: string;
}

export interface ICarritoResponse {
  id: number;
  idUsuario: number;  
  cursos: ICursoCarritoPayload[];
}

export interface IEliminarCarritoResponse {
  message: string;
}