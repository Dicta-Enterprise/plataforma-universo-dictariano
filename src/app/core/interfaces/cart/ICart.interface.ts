export interface ICursoCarritoPayload {
  idcurso: string;
}

export interface ICarritoResponse {
  id: number;
  idUsuario: number;  
  cursos: string[];  
}

export interface IEliminarCarritoResponse {
  message: string;
}