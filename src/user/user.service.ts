import { Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../utils/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams, FindUserParams } from '../utils/types/queries';
import { UserFoundException } from './exceptions/UserFoundException';
import { hashPassword } from '../utils/helpers';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  findUser(params: FindUserParams): Promise<User | undefined> {
    return this.userRepository.findOneBy(params);
  }
  async createUser(params: CreateUserParams): Promise<User> {
    const existingUser = await this.findUser({ username: params.username });
    if (existingUser) throw new UserFoundException();
    params.password = await hashPassword(params.password);
    const newUser = this.userRepository.create(params);
    return this.userRepository.save(newUser);
  }
}
