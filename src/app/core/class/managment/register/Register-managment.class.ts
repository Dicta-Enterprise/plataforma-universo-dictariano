
import { NewActivoState } from 'src/app/shared/enums';

export class RegisterManagment {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;


  constructor(register: Partial<RegisterManagment> = {}) {
    this.username = register.username ?? '';
    this.email = register.email ?? '';
    this.password = register.password ?? '';
    this.confirmPassword = register.confirmPassword ?? '';
  }

  static fromJson(registerManagment: any): RegisterManagment {
    return new RegisterManagment({
      username: registerManagment.username,
      email: registerManagment.email,
      password: registerManagment.password,
      confirmPassword: registerManagment.confirmPassword,
    });
  }

  static toJson(register: RegisterManagment): any {
    return {
        //id: register.id,
      username: register.username,
      email: register.email,
      password: register.password,
      confirmPassword: register.confirmPassword,
      //estado: register.estado,
      //fechaCreacion: register.fechaCreacion,
    };
  }
}
