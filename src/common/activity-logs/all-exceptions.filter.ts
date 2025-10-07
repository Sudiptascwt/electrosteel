import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
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

    // await repo.save({
    //   userId: req.user?.id ?? null, // use ?? for null fallback
    //   action: 'ERROR',
    //   model: null,
    //   data: { message: exception.message, stack: exception.stack, url: req.url },
    //   ip: req.ip ?? req.connection.remoteAddress ?? '',
    //   createdAt: new Date(),
    // });
    await repo.save({
        userId: req.user?.id ?? null,
        action: 'ERROR',
        model: null,
        data: { message: exception.message, stack: exception.stack, url: req.url },
        ip: req.ip || req.socket?.remoteAddress || '',
        createdAt: new Date(),
    });


    res.status(500).json({ message: 'Internal Server Error' });
  }
}
