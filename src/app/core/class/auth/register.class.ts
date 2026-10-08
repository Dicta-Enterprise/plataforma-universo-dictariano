import { AuthCredentials } from './auth-credentials.class';

export class Register extends AuthCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;

  constructor(register: Partial<Register> = {}) {
    super(register);
    this.firstName = register.firstName || '';
    this.lastName = register.lastName || '';
    this.confirmPassword = register.confirmPassword || '';
  }

  static fromJson(register: unknown): Register {
    const casted = register as Record<string, unknown>;
    return new Register({
      firstName: casted['firstName'] as string,
      lastName: casted['lastName'] as string,
      email: casted['email'] as string,
    });
  }

  static toJson(register: Register): unknown {
    return {
      firstName: register.firstName,
      lastName: register.lastName,
      email: register.email,
      password: register.password,
      confirmPassword: register.confirmPassword,
    };
  }
}
