import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  login({ email, password }: AuthDto) {
    console.log('🚀 ~ AuthService ~ login ~ { email, password }:', {
      email,
      password,
    });
    return 'This action adds a new auth';
  }
}
