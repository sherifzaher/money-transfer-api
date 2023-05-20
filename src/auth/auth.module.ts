import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SERVICES } from '../utils/constants';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: SERVICES.AUTH,
      useClass: AuthService,
    },
    LocalStrategy,
  ],
})
export class AuthModule {}
