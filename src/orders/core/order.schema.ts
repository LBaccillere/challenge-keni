import { UUID } from 'src/commons/types/uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/core/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ index: true, unique: true, required: true })
  uuid: UUID;
  @Prop({ index: true, unique: true, required: true })
  number: number;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  clientName: string;
  @Prop({ required: true })
  total: number;
  @Prop()
  products: OrderProduct[];

  constructor(
    uuid: UUID,
    number: number,
    date: Date,
    clientName: string,
    total: number,
    products: OrderProduct[],
  ) {
    this.uuid = uuid;
    this.number = number;
    this.date = date;
    this.clientName = clientName;
    this.total = total;
    this.products = products;
  }
}

export class OrderProduct {
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    required: true,
  })
  product: Product;

  @Prop({
    required: true,
  })
  quantity: number;

  @Prop({
    required: true,
  })
  total: number;

  constructor(product: Product, quantity: number, total: number) {
    this.product = product;
    this.quantity = quantity;
    this.total = total;
  }
}

export const OrderSchema = SchemaFactory.createForClass(Order);
