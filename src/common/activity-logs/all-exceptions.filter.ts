import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ActivityLog } from '../../entity/activity-log.entity';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private dataSource: DataSource) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const repo = this.dataSource.getRepository(ActivityLog);

    // Log the error
    try {
      await repo.save({
        userId: req.user?.id ?? null,
        action: 'ERROR',
        model: null,
        data: { message: exception.message, stack: exception.stack, url: req.url },
        ip: req.ip || req.socket?.remoteAddress || '',
        created_at: new Date(),
      });
    } catch (err) {
      console.error('Error saving activity log:', err);
    }

    // Determine status and response
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      return res.status(status).json(response);
    }

    // Fallback for unknown errors
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
}
