import { CreateUserParams } from '../utils/types/queries';
import { User } from '../utils/typeorm/entities/User';

export interface IAuthService {
  validateUser: () => void;
  registerUser: (params: CreateUserParams) => Promise<User>;
}
