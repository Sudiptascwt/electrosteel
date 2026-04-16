// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { DataSource } from 'typeorm';
// import { ActivityLog } from '../../entity/activity-log.entity'

// // @Injectable()
// // export class LoggingMiddleware implements NestMiddleware {
// //   constructor(private dataSource: DataSource) {}

// //   use(req: Request, res: Response, next: NextFunction) {
// //     res.on('finish', async () => {
// //       try {
// //         const repo = this.dataSource.getRepository(ActivityLog);
// //         await repo.save({
// //           userId: req.user?.id || null, // if using auth
// //           action: 'REQUEST',
// //           model: null,
// //           data: { method: req.method, url: req.originalUrl, body: req.body, query: req.query },
// //           ip: req.ip,
// //         });
// //       } catch (err) {
// //         console.error('Error saving request log:', err);
// //       }
// //     });

// //     next();
// //   }
// // }


// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
//   constructor(private dataSource: DataSource) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     res.on('finish', () => {
//     setImmediate(async () => {
//         try {
//         const repo = this.dataSource.getRepository(ActivityLog);

//         // Create a new instance, do not rely on the request's query runner
//         await repo.save({
//             userId: req.user?.id ?? null,
//             action: 'REQUEST',
//             model: null,
//             data: JSON.stringify({
//                 method: req.method,
//                 url: req.originalUrl,
//                 body: req.body,
//                 query: req.query,
//             }),
//             ip: req.ip,
//             created_at: new Date(),
//         });
//         } catch (err) {
//         console.error('Error saving request log:', err);
//         }
//     });
//     });
//     next();
//   }
// }

// logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { ActivityLog } from '../../entity/activity-log.entity';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Skip logging for static files and health checks
    const skipPaths = ['/uploads/', '/api-docs/', '/favicon.ico'];
    const shouldSkip = skipPaths.some(path => req.originalUrl.startsWith(path));
    
    // Also skip for static assets
    if (shouldSkip || req.originalUrl.match(/\.(jpg|jpeg|png|gif|webp|mp4|pdf|css|js|json)$/)) {
      return next();
    }

    res.on('finish', () => {
      setImmediate(async () => {
        try {
          const repo = this.dataSource.getRepository(ActivityLog);
          await repo.save({
            userId: req.user?.id ?? null,
            action: 'REQUEST',
            model: null,
            data: JSON.stringify({
              method: req.method,
              url: req.originalUrl,
              body: req.body,
              query: req.query,
            }),
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