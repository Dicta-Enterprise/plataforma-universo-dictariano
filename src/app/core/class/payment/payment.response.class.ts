export class CrearOrdenResponse {
  ordenId!:       number;
  nrcompra!:      string | null;
  ordenMpId!:     string;
  pagoMpId!:      string;
  estadoOrden!:   string;
  estadoDetalle!: string;
  montoPagado!:   string;
  fechaCreacion!: string;
}