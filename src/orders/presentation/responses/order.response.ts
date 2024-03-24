import { UUID } from 'src/commons/types/uuid';
import { Order, OrderProduct } from 'src/orders/core/order.schema';

type OrderResponse = {
  uuid: UUID;
  number: number;
  date: Date;
  clientName: string;
  total: number;
  products: OrderProductResponse[];
};

type OrderProductResponse = {
  product: {
    uuid: string;
    name: string;
    SKU: string;
    cover: string;
  };
  quantity: number;
  total: number;
};

const mapToResponse = (order: Order): OrderResponse => {
  return {
    uuid: order.uuid,
    number: order.number,
    date: order.date,
    clientName: order.clientName,
    total: order.total,
    products: order.products?.map(mapOrderProduct),
  };
};

const mapOrderProduct = (orderProduct: OrderProduct) => {
  return {
    product: {
      uuid: orderProduct.product.uuid,
      name: orderProduct.product.name,
      SKU: orderProduct.product.SKU,
      cover: orderProduct.product.cover,
    },
    quantity: orderProduct.quantity,
    total: orderProduct.total,
  };
};

export { OrderResponse, mapToResponse };
