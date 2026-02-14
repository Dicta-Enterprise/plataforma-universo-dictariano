export class LoginResponse {
  constructor(
    public accessToken: string
  ) {}

  static fromJson(json: unknown): LoginResponse {
  const casted = json as Record<string, unknown>;

  return new LoginResponse(
    casted['accessToken'] as string
  );
  }
}
