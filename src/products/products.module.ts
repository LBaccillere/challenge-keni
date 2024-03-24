import { Module } from '@nestjs/common';
import { ProductsController } from 'src/products/presentation/products.controller';
import { ProductsService } from './core/products.service';
import { ProductsDBRepository } from './infrastructure/productsDBRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './core/product.schema';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductsRepository',
      useClass: ProductsDBRepository,
    },
    ProductsService,
  ],
  exports: [ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    FilesModule,
  ],
})
export class ProductsModule {}
