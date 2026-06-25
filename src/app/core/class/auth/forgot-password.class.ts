export class ForgotPassword {
  email: string;
  constructor(data: Partial<ForgotPassword> = {}) {
    this.email = data.email || '';
  }
}

export class VerifyCode {
  email: string;
  code: string;
  constructor(data: Partial<VerifyCode> = {}) {
    this.email = data.email || '';
    this.code = data.code || '';
  }
}

export class ResetPassword {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
  constructor(data: Partial<ResetPassword> = {}) {
    this.email = data.email || '';
    this.code = data.code || '';
    this.newPassword = data.newPassword || '';
    this.confirmPassword = data.confirmPassword || '';
  }
}