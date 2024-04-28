import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./schemas/orders.schema";
import { Model } from "mongoose";
import { Product } from "src/product/schema/product.schema";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderRepository {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>, @InjectModel(Product.name) private productModel: Model<Product>) { }
    async createOrder(createOrderDto: CreateOrderDto, userId: string, invoiceCode) {
        const newOrder = this.orderModel.create({
            createOrderDto,
            user: userId,
            invoiceCode
        })
        return newOrder
    }
    async findAllOrder(): Promise<Order[]> {
        const orders = await this.orderModel.find({}).sort({ _id: -1 }).populate("user", "id name email", null, { strictPopulate: false })
        return orders;
    }
    async getOrder(id:string):Promise<Order[]>{
        const order = await this.orderModel.find({user:id}).sort({_id:-1})
        return order
    }
}