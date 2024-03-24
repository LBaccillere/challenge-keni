import { Order } from 'src/orders/core/order.schema';

export interface StatisticsRepository {
  getTotalSoldInTheLastMonth: () => Promise<number>;
  getTheHigherAmountOrder: () => Promise<Order>;
}
