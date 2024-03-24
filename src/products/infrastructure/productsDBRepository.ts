import { Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { Product } from '../core/product.schema';
import { ProductsRepository } from '../core/products.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsDBRepository implements ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    const savedProduct = await createdProduct.save();
    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().sort({ name: 'asc' });
    return products;
  }

  async findOne(uuid: UUID): Promise<Product> {
    const product = await this.productModel.findOne({ uuid });
    return product;
  }

  async assignCover(uuid: UUID, path: string): Promise<void> {
    await this.productModel.updateOne({ uuid }, { cover: path });

    return;
  }
}
