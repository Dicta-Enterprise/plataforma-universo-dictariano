import { AuthCredentials } from './auth-credentials.class';

export class Register extends AuthCredentials {
  username: string;
  confirmPassword: string;

  constructor(register: Partial<Register> = {}) {
    super(register);
    this.username = register.username || ''; 
    this.confirmPassword = register.confirmPassword || '';
  }

  static fromJson(register: unknown): Register {
    const casted = register as Record<string, unknown>;
    return new Register({
      username: casted['username'] as string,
      email: casted['email'] as string,
    });
  }

  static toJson(register: Register): unknown {
    return {
      username: register.username,
      email: register.email,
      password: register.password,
      confirmPassword: register.confirmPassword,
    };
  }
  
}


