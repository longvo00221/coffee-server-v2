import { prop, plugin, Ref } from '@typegoose/typegoose';
import { User } from '../../user/schemas/user.schema';
import { Product } from '../../product/schema/product.schema';
import mongoose from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

export class OrderItem {
  @prop({ required: true })
  name: string;

  @prop()
  mood: string;

  @prop()
  sugar: string;

  @prop()
  ice: string;

  @prop()
  topping: string[];

  @prop({ required: true })
  qty: number;

  @prop({ required: true })
  image: string;

  @prop({ required: true })
  price: number;

  @prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  product: Ref<Product>;
}

export class ShippingAddress {
  @prop({ required: true })
  address: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  endAddress: string;

  @prop({ required: true })
  ward: string;

  @prop()
  distance: string;

  @prop({ required: true })
  phone: string;

  @prop({ required: true })
  delivery: string;
}

export class PaymentResult {
  @prop()
  id: string;

  @prop()
  status: string;

  @prop()
  update_time: string;

  @prop()
  email_address: string;
}

@plugin(require('mongoose-unique-validator'))
export class Order {
  @prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: Ref<User>;

  @prop()
  orderItems: OrderItem[];

  @prop()
  shippingAddress: ShippingAddress;

  @prop({ required: true })
  paymentMethod: string;

  @prop()
  paymentResult: PaymentResult;

  @prop({ required: true, default: 0.0 })
  taxPrice: number;

  @prop()
  invoiceCode: string;

  @prop({ required: true, default: 0.0 })
  shippingPrice: number;

  @prop({ required: true, default: false })
  totalPrice: number;

  @prop({ required: true, default: false })
  isPaid: boolean;

  @prop()
  paidAt: Date;

  @prop({ required: true, default: false })
  isDelivered: boolean;

  @prop()
  deliveredAt: Date;
}


export const OrderSchema = SchemaFactory.createForClass(Order)