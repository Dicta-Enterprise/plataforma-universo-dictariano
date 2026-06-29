// IAuth.interface.ts
export interface IJwtPayload {
  sub: string;    // string, no number
  email: string;
  idrol: number;
}

export interface ILoginResponse {
  message: string;
}

export interface ILogoutResponse {
  message: string;
}