import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTPayload } from './jwtPayload';
import { UsersService } from 'src/users/core/users.service';
import {
  mapToResponse,
  UserResponse,
} from 'src/users/presentation/responses/user.response';
import useConfigurator from 'src/config';

const { JWT_SECRET } = useConfigurator();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload): Promise<UserResponse> {
    const user = await this.userService.findOne(payload.user.uuid);
    if (!user) {
      throw new UnauthorizedException();
    }
    return mapToResponse(user);
  }
}
