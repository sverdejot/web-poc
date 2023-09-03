import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class MetadataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: Response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        return {
          status: HttpStatus[statusCode],
          code: statusCode,
          data: { ...data },
        };
      }),
    );
  }
}
