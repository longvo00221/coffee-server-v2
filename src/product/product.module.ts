import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { ResponseHandler } from 'src/response';
import { ProductRepository } from './product.repository';
import { Topping, ToppingSchema } from 'src/topping/schemas/topping.schema';


@Module({
  imports: [MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema }, 
    { name: Topping.name, schema: ToppingSchema }
  ])],
  controllers: [ProductController],
  providers: [ProductService, ResponseHandler, ProductRepository],
})
export class ProductModule { }