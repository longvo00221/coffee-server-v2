import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { Order } from './schemas/orders.schema';

@Injectable()
export class OrderService {
  private invoiceCount: number = 0;
  private lastInvoiceDate: Date = new Date();
  constructor(private orderRepository: OrderRepository) { }
  async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {

    try {
      const { orderItems } = createOrderDto
      if (orderItems && orderItems.length === 0) {
        throw new Error('No order items')
      } else {
        // HDTICK+invoice count per /day (reset after 24h) + who (customer or business) + what (buy or sell) + datetime + orderItemlength 
        const currentDate = new Date();
        if (currentDate.getDate() !== this.lastInvoiceDate.getDate()) {
          this.invoiceCount = 0;
          this.lastInvoiceDate = currentDate;
        }
        this.invoiceCount++;
        const invoiceCode = `HDTICK${this.invoiceCount.toString}${currentDate.toISOString()}${orderItems.length}`;
        const orderData = await this.orderRepository.createOrder(createOrderDto, userId, invoiceCode)
        return orderData
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new InternalServerErrorException
      }
    }
  }

  async findAllOrder(): Promise<Order[]> {
    try {
      const allOrder = await this.orderRepository.findAllOrder()
      return allOrder
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new InternalServerErrorException
      }
    }
  }
  async getOrder(id:string):Promise<Order[]>{
    try {
      const order = await this.orderRepository.getOrder(id)
      return order
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new InternalServerErrorException
      }
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
