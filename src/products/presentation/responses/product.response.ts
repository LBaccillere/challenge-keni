import { UUID } from 'src/commons/types/uuid';
import { Product } from 'src/products/core/product.schema';

type ProductResponse = {
  uuid: UUID;
  name: string;
  SKU: string;
  cover: string;
  price: number;
};

const mapToResponse = (product: Product): ProductResponse => {
  return {
    uuid: product.uuid,
    name: product.name,
    SKU: product.SKU,
    cover: product.cover,
    price: product.price,
  };
};

export { ProductResponse, mapToResponse };
