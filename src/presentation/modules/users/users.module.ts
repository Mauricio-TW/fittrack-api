import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../../infra/database/entities/user.entity';
import { UsersController } from '../../controllers/users/users.controller';
import { UsersService } from '../../../application/services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],

  controllers: [UsersController],

  providers: [UsersService],

  exports: [UsersService],
})
export class UsersModule {}