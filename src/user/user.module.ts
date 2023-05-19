import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SERVICES } from '../utils/constants';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: SERVICES.USERS,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
