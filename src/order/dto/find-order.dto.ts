import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOrderDto {
  @IsUUID(undefined, { message: 'id must be a UUID' })
  @IsNotEmpty({ message: 'id is required' })
  id: string;
}
