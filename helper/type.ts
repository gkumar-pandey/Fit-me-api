export type HashPassword = (password: string) => Promise<string>;
export type CheckPasswordMatch = (
  userPassword: string,
  storedPassword: string
) => Promise<boolean>;
