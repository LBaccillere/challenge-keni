import { UUID } from 'src/commons/types/uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ index: true, unique: true, required: true })
  uuid: UUID;
  @Prop({ required: true })
  name: string;
  @Prop({ index: true, required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  role: Role;

  constructor(
    uuid: UUID,
    name: string,
    email: string,
    password: string,
    role: Role,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export const UserSchema = SchemaFactory.createForClass(User);
