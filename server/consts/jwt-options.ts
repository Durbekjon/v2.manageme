export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';
export const JWT_SECRET = process.env.JWT_SECRET || 'customsecret';
export const REFRESH_SECRET =
  process.env.REFRESH_SECRET || 'customrefreshsecrettoken';
export const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '8h';
export const SALT_ROUNDS = 8;
