// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/activity-logs/all-exceptions.filter';
import { DataSource } from 'typeorm';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as mime from 'mime-types';

async function bootstrap() {
  // use NestExpressApplication so we can use express/static helpers reliably
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1️⃣ CORS
  app.enableCors({
    // origin: ['http://localhost:3000'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // 2️⃣ Swagger
  const config = new DocumentBuilder()
    .setTitle('Electrosteel API')
    .setDescription('API documentation for Electrosteel project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // 3️⃣ Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter(app.get(DataSource)));

  // 4️⃣ Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
    }),
  );

  //Cookie parser
  app.use(cookieParser());

  //Serve static uploads (with correct Content-Type headers)
  const uploadsDir = path.join(__dirname, '..', 'uploads');

app.use(
  '/uploads',
  express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
      const contentType = mime.lookup(filePath);

      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }

      // ✅ Allow other origins (React app, etc.) to load these files
      res.setHeader('Access-Control-Allow-Origin', '*'); // or specific origin
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');

      // ✅ Important for modern Chrome when using cross-origin embedding
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  }),
);



  // 7️⃣ Start server
  await app.listen(2000, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:2000`);
}
bootstrap();
