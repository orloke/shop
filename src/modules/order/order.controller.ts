import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, RequestWithUser } from '../auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrderDto } from './dto/find-order.dto';
import { StatusOrder } from './enum/statusOrder.enum';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createdOrder: CreateOrderDto,
  ) {
    return this.orderService.create(req.user.sub, createdOrder);
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
