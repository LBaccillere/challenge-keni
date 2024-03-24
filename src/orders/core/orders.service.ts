import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { CreateOrderDto } from '../presentation/requests/createOrder.dto';
import { Order, OrderProduct } from './order.schema';
import { v4 as uuidv4 } from 'uuid';
import { OrdersRepository } from './orders.repository';
import { UpdateOrderDto } from '../presentation/requests/updateOrder.dto';
import { ProductsService } from 'src/products/core/products.service';
import { ApiError } from 'src/utils/types/apiError';
import {
  HTTP_ERROR_CODES,
  HTTP_ERROR_MESSAGES,
} from 'src/utils/constants/error';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrdersRepository') private orderRepository: OrdersRepository,
    @Inject(ProductsService) private productService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderProducts: OrderProduct[] = await Promise.all(
      createOrderDto.products.map(async (p) => {
        const product = await this.productService.findOne(p.productUUID);
        if (!product) {
          throw new ApiError(
            HTTP_ERROR_CODES.BAD_REQUEST,
            `Product ${p.productUUID} not found`,
          );
        }
        const total = product.price * p.quantity;

        return new OrderProduct(product, p.quantity, total);
      }),
    );
    const orderTotalPrice = orderProducts.reduce(
      (acc, orderProduct) => acc + orderProduct.total,
      0,
    );
    const orderNumber = await this.getNextOrderNumber();
    const order: Order = new Order(
      uuidv4(),
      orderNumber,
      new Date(),
      createOrderDto.clientName,
      orderTotalPrice,
      orderProducts,
    );
    return this.orderRepository.create(order);
  }

  async update(uuid: UUID, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(uuid);

    if (!order)
      throw new ApiError(
        HTTP_ERROR_CODES.NOT_FOUND,
        HTTP_ERROR_MESSAGES.NOT_FOUND,
      );

    const orderProducts: OrderProduct[] = await Promise.all(
      updateOrderDto.products?.map(async (p) => {
        const product = await this.productService.findOne(p.productUUID);
        if (!product) {
          throw new ApiError(
            HTTP_ERROR_CODES.BAD_REQUEST,
            `Product ${p.productUUID} not found`,
          );
        }
        const total = product.price * p.quantity;

        return new OrderProduct(product, p.quantity, total);
      }),
    );
    const orderTotalPrice = orderProducts?.reduce(
      (acc, orderProduct) => acc + orderProduct.total,
      0,
    );

    order.clientName = updateOrderDto.clientName;
    order.total = orderTotalPrice;
    order.products = orderProducts;

    return this.orderRepository.update(uuid, order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  findOne(uuid: UUID): Promise<Order> {
    return this.orderRepository.findOne(uuid);
  }

  getNextOrderNumber(): Promise<number> {
    return this.orderRepository.getNextOrderNumber();
  }
}
