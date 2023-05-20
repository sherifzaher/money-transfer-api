import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { SERVICES } from '../../utils/constants';
import { IUserService } from '../../user/user';
import { User } from '../../utils/typeorm/entities/User';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(SERVICES.USERS) private readonly userService: IUserService,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user.id });
    return userDb ? done(null, user) : done(null, null);
  }
}
