import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ROUTES, SERVICES } from '../utils/constants';
import { IAuthService } from './auth';
import { RegisterUserDto } from './dtos/RegisterUser.dto';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: IAuthService,
  ) {}
  @Post('register')
  async registerUser(@Body() registerPayload: RegisterUserDto) {
    return this.authService.registerUser(registerPayload);
  }
}
