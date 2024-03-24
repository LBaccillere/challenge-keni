import { UUID } from 'src/commons/types/uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ index: true, unique: true, required: true })
  uuid: UUID;
  @Prop({ required: true })
  name: string;
  @Prop({ index: true, required: true })
  SKU: string;
  @Prop()
  cover: string;
  @Prop({ required: true })
  price: number;

  constructor(uuid: UUID, name: string, SKU: string, price: number) {
    this.uuid = uuid;
    this.name = name;
    this.SKU = SKU;
    this.price = price;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
