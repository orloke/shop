import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { StatusOrder } from '../enum/statusOrder.enum';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'amount is required' })
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  amount: number;

  @IsOptional()
  @IsEnum(StatusOrder, {
    message: 'status must be processing, processed or canceled',
  })
  status: StatusOrder;
}
