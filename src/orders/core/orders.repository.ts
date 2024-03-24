import { UUID } from 'src/commons/types/uuid';
import { Order } from './order.schema';

export interface OrdersRepository {
  create: (order: Order) => Promise<Order>;
  update: (uuid: UUID, order: Order) => Promise<Order>;
  findAll: () => Promise<Order[]>;
  findOne: (uuid: UUID) => Promise<Order>;
  getNextOrderNumber: () => Promise<number>;
}
