import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { SERVICES } from '../utils/constants';
import { UserService } from './user.service';
import { User } from '../utils/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: SERVICES.USERS,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: SERVICES.USERS,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
