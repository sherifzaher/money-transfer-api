import { CreateUserParams, FindUserParams } from '../utils/types/queries';
import { User } from '../utils/typeorm/entities/User';

export interface IUserService {
  createUser: (params: CreateUserParams) => Promise<User | undefined>;
  findUser: (params: FindUserParams) => Promise<User>;
}
