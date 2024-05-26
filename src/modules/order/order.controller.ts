import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { FindOrderDto } from './dto/find-order.dto';
import { StatusOrder } from './enum/statusOrder.enum';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Query('userId') userId: string,
    @Body() createdOrder: CreateOrderDto,
  ) {
    return this.orderService.create(userId, createdOrder);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getOrders();
  }

  @Get('/:id')
  async getOrderById(@Param() params: FindOrderDto) {
    return this.orderService.findOrderById(params.id);
  }

  @Put('/:id')
  async updateOrderStatus(
    @Param() params: FindOrderDto,
    @Query('status') status: StatusOrder,
  ) {
    return this.orderService.updateOrderStatus(params.id, status);
  }
}
