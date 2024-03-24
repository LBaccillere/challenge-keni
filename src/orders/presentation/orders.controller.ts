import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { OrdersService } from 'src/orders/core/orders.service';
import { OrderResponse, mapToResponse } from './responses/order.response';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  OrdersResponse,
  mapToResponse as mapToPaginatedResponse,
} from './responses/orders.response';
import { AUTH_ERRORS, HTTP_ERROR_CODES } from 'src/utils/constants/error';
import { ApiError } from 'src/utils/types/apiError';
import { CreateOrderDto } from './requests/createOrder.dto';
import { UpdateOrderDto } from './requests/updateOrder.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async create(@Body() orderDto: CreateOrderDto): Promise<OrderResponse> {
    return mapToResponse(await this.ordersService.create(orderDto));
  }

  @Put('/:uuid')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiParam({
    name: 'uuid',
    required: true,
    type: String,
    description: 'UUID of the resource to update',
  })
  @ApiBearerAuth('JWT-auth')
  async update(
    @Param('uuid') uuid: UUID,
    @Body() orderDto: UpdateOrderDto,
  ): Promise<OrderResponse> {
    if (!uuid)
      throw new ApiError(HTTP_ERROR_CODES.BAD_REQUEST, 'UUID is required');

    return mapToResponse(await this.ordersService.update(uuid, orderDto));
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async findAll(): Promise<OrdersResponse> {
    return mapToPaginatedResponse(await this.ordersService.findAll());
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
  async findOne(@Param('uuid') uuid: UUID): Promise<OrderResponse> {
    const order = await this.ordersService.findOne(uuid);

    if (!order) {
      throw new ApiError(HTTP_ERROR_CODES.NOT_FOUND, 'Order not found');
    }

    return mapToResponse(await this.ordersService.findOne(uuid));
  }
}
