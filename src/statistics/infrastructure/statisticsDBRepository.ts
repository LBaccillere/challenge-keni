import { Injectable } from '@nestjs/common';
import { StatisticsRepository } from '../core/statistics.repository';
import { Order } from 'src/orders/core/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StatisticsDBRepository implements StatisticsRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getTotalSoldInTheLastMonth(): Promise<number> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastDayOfMonth = new Date(
      lastMonth.getFullYear(),
      lastMonth.getMonth() + 1,
      0,
    );

    const orders = await this.orderModel.find({
      date: {
        $gte: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
        $lte: lastDayOfMonth,
      },
    });

    return orders?.reduce((acc, order) => acc + order.total, 0) ?? 0;
  }

  async getTheHigherAmountOrder(): Promise<Order> {
    const order = await this.orderModel.findOne().sort({ total: 'desc' });

    return order;
  }
}
