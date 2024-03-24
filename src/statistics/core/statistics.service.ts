import { Inject, Injectable } from '@nestjs/common';
import { StatisticsRepository } from './statistics.repository';
import { Order } from 'src/orders/core/order.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject('StatisticsRepository')
    private statisticRepository: StatisticsRepository,
  ) {}

  getTotalSoldInTheLastMonth(): Promise<number> {
    return this.statisticRepository.getTotalSoldInTheLastMonth();
  }

  getTheHigherAmountOrder(): Promise<Order> {
    return this.statisticRepository.getTheHigherAmountOrder();
  }
}
