import { Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { Order } from '../core/order.schema';
import { OrdersRepository } from '../core/orders.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersDBRepository implements OrdersRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    const savedOrder = await createdOrder.save();
    return savedOrder;
  }

  async update(_uuid: UUID, order: Order): Promise<Order> {
    const updateOrderModel = new this.orderModel(order);

    return await updateOrderModel.save();
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find().sort({ name: 'asc' });
    return orders;
  }

  async findOne(uuid: UUID): Promise<Order> {
    const order = await this.orderModel.findOne({ uuid });
    return order;
  }

  async getNextOrderNumber(): Promise<number> {
    const order = await this.orderModel.findOne().sort({ number: 'desc' });

    return (order?.number ?? 0) + 1;
  }
}
