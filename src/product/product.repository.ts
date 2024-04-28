import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { filterItemInteface, productId } from "./interface/getProduct.interface";
import { Topping } from "src/topping/schemas/topping.schema";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>, @InjectModel(Topping.name) private ToppingSchema: Model<Topping>) { }

    async getProduct(keyword: filterItemInteface) {
        return await this.productModel.find({ ...keyword })
    }
    async getToppings(keyword: filterItemInteface) {
        return this.ToppingSchema.find({ ...keyword })
    }
    async getProductById(id: productId) {
        return this.productModel.findById(id)
    }
    async deleteProduct(id: productId) {
        return this.productModel.findByIdAndDelete(id)
    }
    async findExistProduct(name: string) {
        return this.productModel.findOne({ name })
    }
    async createNewProduct(createProductDto: CreateProductDto, user?: string) {

        const product = this.productModel.create({ createProductDto, user: user })

        return product

    }
    async updateProduct(id: string, updateProductDto: UpdateProductDto) {
        const { name, title, nameId, image, price, countInStock } = updateProductDto;
        const product = await this.productModel.findById(id)
        if (product) {
            product.name = name || product.name;
            product.title = title || product.title;
            product.nameId = nameId || product.nameId;
            product.image = image || product.image;
            product.price = price || product.price;
            product.countInStock = countInStock || product.countInStock;
            const editProduct = await product.save()
            return editProduct
        }
    }
}