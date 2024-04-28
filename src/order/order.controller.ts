import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request, Response } from 'express';
import { ResponseHandler } from 'src/response';
import { Private } from 'src/common/decorators/private.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly response: ResponseHandler) { }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Res() res: Response, @Req() req: Request & { user: { _id: string } }): Promise<Response> {
    try {
      const orderData = await this.orderService.createOrder(createOrderDto, req.user._id);
      return this.response.responseWithData(res, 200, orderData)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message)
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      }
    }
  }
  @Private()
  @Get('/all')
  async findAllOrder(@Res() res: Response): Promise<Response> {
    try {
      const allOrder = await this.orderService.findAllOrder()
      return this.response.responseWithData(res, 200, allOrder)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message)
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      }
    }
  }
  @Private()
  @Get()
  async getOrder(@Req() req: Request & { user: { _id: string } }, @Res() res: Response): Promise<Response> {
    try {
      const userId = req.user._id;
      const order = await this.orderService.getOrder(userId)
      return this.response.responseWithData(res, 200, order)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message)
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      }
    }
  }
  @Private()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
  @Private()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }
  @Private()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
