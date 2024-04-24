import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
@Injectable()
export class ProductRepository {
    constructor (@InjectModel(Product.name) private productModel: Model<Product>){}

    async getAllProduct() {
        return await this.productModel.find().exec()
    }
}