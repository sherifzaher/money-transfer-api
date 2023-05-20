import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IAuthService } from './auth';
import {
  CreateUserParams,
  UserCredentialsParams,
} from '../utils/types/queries';
import { User } from '../utils/typeorm/entities/User';
import { SERVICES } from '../utils/constants';
import { IUserService } from '../user/user';
import { compareHash } from '../utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICES.USERS) private readonly userService: IUserService,
  ) {}
  registerUser(params: CreateUserParams): Promise<User> {
    return this.userService.createUser(params);
  }

  async validateUser(params: UserCredentialsParams): Promise<User> {
    const user = await this.userService.findUser(
      { username: params.username },
      { selectPassword: true },
    );
    const isPasswordValid = await compareHash(params.password, user.password);
    if (!isPasswordValid)
      throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
    return user;
  }
}
