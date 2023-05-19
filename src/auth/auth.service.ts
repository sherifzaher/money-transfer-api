import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { CreateUserParams } from '../utils/types/queries';
import { User } from '../utils/typeorm/entities/User';
import { SERVICES } from '../utils/constants';
import { IUserService } from '../user/user';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICES.USERS) private readonly userService: IUserService,
  ) {}
  registerUser(params: CreateUserParams): Promise<User> {
    return this.userService.createUser(params);
  }

  validateUser(): void {}
}
