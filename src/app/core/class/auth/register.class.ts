import { AuthCredentials } from './auth-credentials.class';

export class Register extends AuthCredentials {
  username: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  acceptTerms: boolean;

  constructor(register: Partial<Register> = {}) {
    super(register);
    this.username = register.username || '';
    this.firstName = register.firstName || '';
    this.lastName = register.lastName || '';
    this.confirmPassword = register.confirmPassword || '';
    this.acceptTerms = register.acceptTerms ?? false;
  }

  static fromJson(register: unknown): Register {
    const casted = register as Record<string, unknown>;
    return new Register({
      username: casted['username'] as string,
      firstName: casted['nombre'] as string,
      lastName: casted['apellido'] as string,
      email: casted['email'] as string,
      acceptTerms: casted['terminos_condiciones'] as boolean,
    });
  }

  static toJson(register: Register): unknown {
    return {
      username: register.username || undefined,
      nombre: register.firstName,
      apellido: register.lastName,
      email: register.email,
      password: register.password,
      confirmPassword: register.confirmPassword,
      acceptTerms: register.acceptTerms,
    };
  }
}
