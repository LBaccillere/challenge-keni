import { Order } from 'src/orders/core/order.schema';

type TotalSoldInTheLastMonthStatisticResponse = {
  totalSoldInTheLastMonth: number;
};

type TheHigherAmountOrderResponse = {
  order: {
    number: number;
    total: number;
  };
};

const mapToTotalSoldResponse = (
  totalSoldInTheLastMonth: number,
): TotalSoldInTheLastMonthStatisticResponse => {
  return {
    totalSoldInTheLastMonth,
  };
};

const mapToTheHigherAmountOrderResponse = (
  order: Order,
): TheHigherAmountOrderResponse => {
  return {
    order: {
      number: order.number,
      total: order.total,
    },
  };
};

export {
  TotalSoldInTheLastMonthStatisticResponse,
  mapToTotalSoldResponse,
  TheHigherAmountOrderResponse,
  mapToTheHigherAmountOrderResponse,
};
