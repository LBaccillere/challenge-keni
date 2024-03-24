import { Product } from 'src/products/core/product.schema';
import {
  ProductResponse,
  mapToResponse as mapToProductResponse,
} from './product.response';

type ProductsResponse = {
  data: ProductResponse[];
};

const mapToResponse = (products: Product[]): ProductsResponse => {
  return {
    data: products.map((i) => mapToProductResponse(i)),
  };
};

export { ProductsResponse, mapToResponse };
