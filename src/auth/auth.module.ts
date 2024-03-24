import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './core/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { EncryptService } from 'src/commons/services/encrypt.service';
import { AuthGuard } from './auth.guard';
import useConfigurator from 'src/config';

const { JWT_SECRET } = useConfigurator();
@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1440s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, EncryptService, AuthGuard],
})
export class AuthModule {}
