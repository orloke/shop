import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { FindOrderDto } from './dto/find-order.dto';

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
    return this.orderService.getOrderById(params.id);
  }
}
