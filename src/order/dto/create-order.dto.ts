import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { StatusOrder } from '../enum/statusOrder.enum';

export class OrderItemDto {
  @IsUUID()
  @IsNotEmpty({ message: 'productId is required' })
  productId: string;

  @IsInt()
  @Min(1, { message: 'quantity must be greater than zero' })
  @IsNotEmpty({ message: 'quantity is required' })
  quantity: number;
}
export class CreateOrderDto {
  @IsOptional()
  @IsEnum(StatusOrder, {
    message: 'status must be processing, processed or canceled',
  })
  status: StatusOrder;

  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one order item is required' })
  items: OrderItemDto[];
}
