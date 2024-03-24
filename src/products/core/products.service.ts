import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { CreateProductDto } from '../presentation/requests/createProduct.dto';
import { Product } from './product.schema';
import { v4 as uuidv4 } from 'uuid';
import { ProductsRepository } from './products.repository';
import { ApiError } from 'src/utils/types/apiError';
import { HTTP_ERROR_CODES } from 'src/utils/constants/error';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductsRepository') private productRepository: ProductsRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = new Product(
      uuidv4(),
      createProductDto.name,
      createProductDto.SKU,
      createProductDto.price,
    );
    return this.productRepository.create(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  findOne(uuid: UUID): Promise<Product> {
    return this.productRepository.findOne(uuid);
  }

  async assignCover(uuid: UUID, path: string): Promise<void> {
    const product = await this.findOne(uuid);

    if (!product)
      throw new ApiError(HTTP_ERROR_CODES.NOT_FOUND, 'Product not found');

    return this.productRepository.assignCover(uuid, path);
  }
}
