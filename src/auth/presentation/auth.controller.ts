import { Controller, Post, Body, Query, HttpCode } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { AuthService } from '../core/auth.service';
import { LoginDto } from './requests/login.dto';
import { RegisterDto } from './requests/register.dto';
import { ApiConflictResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_ERROR_MESSAGES } from 'src/utils/constants/error';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/register')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiConflictResponse({
    description: HTTP_ERROR_MESSAGES.USER_ALREADY_REGISTERED,
  })
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ access_token: string }> {
    return this.authService.register(registerDto);
  }

  @Post('auth/login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Ok',
  })
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }
}
