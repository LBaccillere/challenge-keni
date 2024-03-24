import { Module } from '@nestjs/common';
import { EncryptService } from 'src/commons/services/encrypt.service';
import { UsersController } from 'src/users/presentation/users.controller';
import { UsersService } from './core/users.service';
import { UsersDBRepository } from './infrastructure/usersDBRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './core/user.schema';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersDBRepository,
    },
    UsersService,
    EncryptService,
  ],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
