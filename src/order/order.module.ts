import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/orders.schema';
import { Product, ProductSchema } from 'src/product/schema/product.schema';
import { ResponseHandler } from 'src/response';
import { OrderRepository } from './order.repository';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema },
    { name: Product.name, schema: ProductSchema },
    { name: User.name, schema: UserSchema }
  ]),UserModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, ResponseHandler,],
})
export class OrderModule { }
