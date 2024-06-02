import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.service';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  extractToken(request: Request): string | undefined {
    const authorization = request.headers['authorization'] as string;
    const [type, token] = authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);
    const configService = new ConfigService();
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: configService.get('JWT_SECRET'),
      });
      request['user'] = payload;
    } catch (error) {
      console.log('🚀 ~ AuthGuard ~ canActivate ~ error:', error);

      throw new UnauthorizedException('JWT token verification failed');
    }
    return true;
  }
}
