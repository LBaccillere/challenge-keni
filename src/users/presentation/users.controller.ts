import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { UsersService } from 'src/users/core/users.service';
import { UserResponse, mapToResponse } from './responses/user.response';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  UsersResponse,
  mapToResponse as mapToPaginatedResponse,
} from './responses/users.response';
import { AUTH_ERRORS, HTTP_ERROR_CODES } from 'src/utils/constants/error';
import { ApiError } from 'src/utils/types/apiError';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async findAll(): Promise<UsersResponse> {
    return mapToPaginatedResponse(await this.usersService.findAll());
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':uuid')
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async findOne(@Param('uuid') uuid: UUID): Promise<UserResponse> {
    const user = await this.usersService.findOne(uuid);

    if (!user) {
      throw new ApiError(HTTP_ERROR_CODES.NOT_FOUND, 'User not found');
    }

    return mapToResponse(await this.usersService.findOne(uuid));
  }
}
