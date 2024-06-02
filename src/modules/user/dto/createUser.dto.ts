import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { IsSingleEmail } from './validation/singleEmail.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail()
  @IsSingleEmail({ message: 'Email already exists' })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'Password must have at least 8 characters and contain at least one letter and one number',
  })
  password: string;
}
