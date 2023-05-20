import { User } from '../typeorm/entities/User';

export enum ROUTES {
  AUTH = 'auth',
  USER = 'users',
}

export enum SERVICES {
  AUTH = 'AUTH_SERVICE',
  USERS = 'USERS_SERVICE',
}

const findUserSelectors: (keyof User)[] = [
  'firstName',
  'lastName',
  'id',
  'username',
  'createdAt',
];

export const getUserSelectors = (selectPassword: boolean): (keyof User)[] =>
  selectPassword ? [...findUserSelectors, 'password'] : findUserSelectors;
