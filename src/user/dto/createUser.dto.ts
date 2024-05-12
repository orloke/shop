import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsSingleEmail } from './validation/singleEmail.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail()
  @IsSingleEmail({ message: 'Email already exists' })
  email: string;

  @MinLength(6)
  password: string;
}
