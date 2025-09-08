export class AuthUser {
  id!: number | string;
  nombre!: string;
  email!: string;
  avatar?: string;

  static fromJson(o: any): AuthUser {
    const u = new AuthUser();
    u.id     = o?.id;
    u.nombre = o?.nombre ?? o?.name ?? '';
    u.email  = o?.email ?? '';
    u.avatar = o?.avatar ?? '';
    return u;
  }
  static toJson(u: AuthUser) {
    return { id: u.id, nombre: u.nombre, email: u.email, avatar: u.avatar ?? '' };
  }
}

export class AuthSession {
  access_token!: string;
  user!: AuthUser;

  static fromJson(o: any): AuthSession {
    const s = new AuthSession();
    s.access_token = o?.access_token ?? o?.token ?? '';
    s.user         = AuthUser.fromJson(o?.user);
    return s;
  }
  static toJson(s: AuthSession) {
    return { access_token: s.access_token, user: AuthUser.toJson(s.user) };
  }
}
