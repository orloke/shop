import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail(undefined, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
