import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from 'src/modules/auth/auth.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | RequestWithUser>();

    const { method, url } = request;
    this.logger.log(`Rota: ${method} ${url}`);

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(`Rota acessada pelo usuário ${request.user.email}`);
        }
        this.logger.log(
          `Rota: ${method} ${url} - Tempo de execução: ${Date.now() - start}ms`,
        );
      }),
    );
  }
}
