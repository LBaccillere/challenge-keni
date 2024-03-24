import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatisticsService } from 'src/statistics/core/statistics.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AUTH_ERRORS } from 'src/utils/constants/error';
import {
  TheHigherAmountOrderResponse,
  TotalSoldInTheLastMonthStatisticResponse,
  mapToTheHigherAmountOrderResponse,
  mapToTotalSoldResponse,
} from './responses/statistic.response';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/total-sold-in-the-last-month')
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async getTotalSoldInTheLastMonth(): Promise<TotalSoldInTheLastMonthStatisticResponse> {
    return mapToTotalSoldResponse(
      await this.statisticsService.getTotalSoldInTheLastMonth(),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/the-higher-amount-order')
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async getTheHigherAmountOrder(): Promise<TheHigherAmountOrderResponse> {
    return mapToTheHigherAmountOrderResponse(
      await this.statisticsService.getTheHigherAmountOrder(),
    );
  }
}
