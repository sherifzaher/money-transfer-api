import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { ROUTES, SERVICES } from '../utils/constants';
import { IAuthService } from './auth';
import { RegisterUserDto } from './dtos/RegisterUser.dto';
import { instanceToPlain } from 'class-transformer';
import { LocalAuthGuard } from './utils/Guards';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: IAuthService,
  ) {}
  @Post('register')
  async register(@Body() registerPayload: RegisterUserDto) {
    return instanceToPlain(
      await this.authService.registerUser(registerPayload),
    );
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login() {
    return 'ok';
  }
}
