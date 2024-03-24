import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'src/commons/types/uuid';
import { UsersService } from 'src/users/core/users.service';
import { EncryptService } from '../../commons/services/encrypt.service';
import { JWTPayload } from '../jwtPayload';
import { LoginDto } from '../presentation/requests/login.dto';
import { RegisterDto } from '../presentation/requests/register.dto';
import { User } from 'src/users/core/user.schema';
import useConfigurator from 'src/config';
import { ApiError } from 'src/utils/types/apiError';
import {
  HTTP_ERROR_CODES,
  HTTP_ERROR_MESSAGES,
} from 'src/utils/constants/error';

const { JWT_SECRET } = useConfigurator();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);
      if (
        user &&
        this.encryptService.compareEncrypted(user.password, loginDto.password)
      ) {
        const { access_token } = await this.generateAccessToken(user);
        return { access_token };
      }
      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async register(registerDto: RegisterDto): Promise<any> {
    let userExists;
    try {
      userExists = await this.usersService.findByEmail(registerDto.email);
    } catch (e) {}

    if (userExists) {
      throw new ApiError(
        HTTP_ERROR_CODES.CONFLICT,
        HTTP_ERROR_MESSAGES.USER_ALREADY_REGISTERED,
      );
    }

    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
    });
    const { access_token } = await this.generateAccessToken(user);
    return { access_token };
  }

  async logout(uuid: UUID): Promise<any> {
    return { message: 'log out is ok' };
  }

  async generateAccessToken(user: User) {
    const payload: JWTPayload = { user };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: JWT_SECRET,
      }),
    };
  }
}
