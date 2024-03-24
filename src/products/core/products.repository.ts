import { UUID } from 'src/commons/types/uuid';
import { Product } from './product.schema';

export interface ProductsRepository {
  create: (product: Product) => Promise<Product>;
  findAll: () => Promise<Product[]>;
  findOne: (uuid: UUID) => Promise<Product>;
  assignCover: (uuid: UUID, path: string) => Promise<void>;
}
