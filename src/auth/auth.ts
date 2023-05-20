import {
  CreateUserParams,
  UserCredentialsParams,
} from '../utils/types/queries';
import { User } from '../utils/typeorm/entities/User';

export interface IAuthService {
  validateUser: (params: UserCredentialsParams) => Promise<User>;
  registerUser: (params: CreateUserParams) => Promise<User>;
}
