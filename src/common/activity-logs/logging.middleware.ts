import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { ActivityLog } from '../../entity/activity-log.entity'

// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
//   constructor(private dataSource: DataSource) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     res.on('finish', async () => {
//       try {
//         const repo = this.dataSource.getRepository(ActivityLog);
//         await repo.save({
//           userId: req.user?.id || null, // if using auth
//           action: 'REQUEST',
//           model: null,
//           data: { method: req.method, url: req.originalUrl, body: req.body, query: req.query },
//           ip: req.ip,
//         });
//       } catch (err) {
//         console.error('Error saving request log:', err);
//       }
//     });

//     next();
//   }
// }


@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
    setImmediate(async () => {
        try {
        const repo = this.dataSource.getRepository(ActivityLog);

        // Create a new instance, do not rely on the request's query runner
        await repo.save({
            userId: req.user?.id ?? null,
            action: 'REQUEST',
            model: null,
            data: {
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            query: req.query,
            },
            ip: req.ip,
            created_at: new Date(),
        });
        } catch (err) {
        console.error('Error saving request log:', err);
        }
    });
    });
    next();
  }
}