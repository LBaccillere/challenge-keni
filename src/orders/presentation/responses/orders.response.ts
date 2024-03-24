import { Order } from 'src/orders/core/order.schema';
import {
  OrderResponse,
  mapToResponse as mapToOrderResponse,
} from './order.response';

type OrdersResponse = {
  data: OrderResponse[];
};

const mapToResponse = (orders: Order[]): OrdersResponse => {
  return {
    data: orders.map((i) => mapToOrderResponse(i)),
  };
};

export { OrdersResponse, mapToResponse };
