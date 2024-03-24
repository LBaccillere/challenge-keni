import { Module } from '@nestjs/common';
import { OrdersController } from 'src/orders/presentation/orders.controller';
import { OrdersService } from './core/orders.service';
import { OrdersDBRepository } from './infrastructure/ordersDBRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './core/order.schema';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OrdersController],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductsModule,
  ],
  exports: [OrdersService],
  providers: [
    {
      provide: 'OrdersRepository',
      useClass: OrdersDBRepository,
    },
    OrdersService,
  ],
})
export class OrdersModule {}
