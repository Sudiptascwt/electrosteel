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

async function bootstrap() {
  // use NestExpressApplication so we can use express/static helpers reliably
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1️⃣ CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
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

  // 5️⃣ Cookie parser
  app.use(cookieParser());

  // 6️⃣ Serve static uploads
  // Use path.join(__dirname, '..', 'uploads') so this works after ts->js build (dist)
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  // Option A: Express static
  app.use('/uploads', express.static(uploadsDir));
  // Option B (alternative): app.useStaticAssets(uploadsDir, { prefix: '/uploads/' });

  // 7️⃣ Start server
  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:3000`);
}
bootstrap();
