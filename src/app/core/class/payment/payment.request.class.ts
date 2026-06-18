export class DetalleOrden {
  idcurso!:     number;
  nombrecurso!: string;
  precio!:      number;
}

export class PagoPayload {
  fechapago!:       string;
  monto!:           number;
  nombrepagante!:   string;
  emailpagante!:    string;
  moneda!:          string;
  metodopago!:      string;
  tipotarjeta!:     string;
  token!:           string;
  cuotas!:          number;
  processing_mode!: string;
}

export class CrearOrdenRequest {
  idusuario!:    number;
  estado!:       string;
  detalleOrden!: DetalleOrden[];
  pago!:         PagoPayload;
}