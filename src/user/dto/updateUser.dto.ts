import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsSingleEmail } from './validation/singleEmail.validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsOptional()
  name: string;

  @IsEmail()
  @IsSingleEmail({ message: 'Email already exists' })
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}
