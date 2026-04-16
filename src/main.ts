// main.ts
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
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ========== 1. STATIC FILES (ABSOLUTE HIGHEST PRIORITY) ==========
  const uploadsDir = path.join(process.cwd(), 'uploads');
  
  // Ensure uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`✅ Created uploads directory: ${uploadsDir}`);
  }
  
  console.log(`📁 Serving static files from: ${uploadsDir}`);
  
  // Log existing files on startup for debugging
  const existingFiles = fs.readdirSync(uploadsDir);
  if (existingFiles.length > 0) {
    console.log(`📄 Existing files:`, existingFiles);
  }
  
  // Serve static files - THIS MUST BE THE VERY FIRST MIDDLEWARE
  app.use('/uploads', express.static(uploadsDir, {
    fallthrough: false, // Don't fall through to other routes if file not found
    setHeaders: (res, filePath) => {
      // Set cache headers for better performance
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  }));

  // ========== 2. CORS ==========
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    credentials: true,
  });

  // ========== 3. Helmet ==========
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  }));

  // ========== 4. Cookie Parser ==========
  app.use(cookieParser());

  // ========== 5. Swagger ==========
  const config = new DocumentBuilder()
    .setTitle('Electrosteel API')
    .setDescription('API documentation for Electrosteel project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // ========== 6. Global Exception Filter ==========
  app.useGlobalFilters(new AllExceptionsFilter(app.get(DataSource)));

  // ========== 7. Start Server ==========
  await app.listen(2000, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:2000`);
}

bootstrap();