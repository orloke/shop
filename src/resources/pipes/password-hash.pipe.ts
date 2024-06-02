import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PasswordHashPipe implements PipeTransform {
  transform(password: string) {
    return password + 'hashed';
  }
}
