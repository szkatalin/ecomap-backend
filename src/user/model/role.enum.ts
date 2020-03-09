export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER'
}

export const ROLES = Object.keys(Role).map(keys => keys);
