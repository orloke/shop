import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

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
}