import { Module } from '@nestjs/common';
import { StatisticsController } from 'src/statistics/presentation/statistics.controller';
import { StatisticsService } from './core/statistics.service';
import { StatisticsDBRepository } from './infrastructure/statisticsDBRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/core/order.schema';

@Module({
  controllers: [StatisticsController],
  providers: [
    {
      provide: 'StatisticsRepository',
      useClass: StatisticsDBRepository,
    },
    StatisticsService,
  ],
  exports: [StatisticsService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
})
export class StatisticsModule {}
