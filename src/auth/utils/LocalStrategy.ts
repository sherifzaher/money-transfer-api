import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';
import { SERVICES } from '../../utils/constants';
import { IAuthService } from '../auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: IAuthService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    return this.authService.validateUser({ username, password });
  }
}
