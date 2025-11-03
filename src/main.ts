// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/activity-logs/all-exceptions.filter';
import { DataSource } from 'typeorm';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🧠 1️⃣ Enable CORS before any other middleware
  app.enableCors({
  origin: ['http://localhost:3000'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // allow cookies / Authorization headers
  });

  // 🧾 2️⃣ Swagger config
  const config = new DocumentBuilder()
    .setTitle('Electrosteel API')
    .setDescription('API documentation for Electrosteel project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // ⚙️ 3️⃣ Global Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter(app.get(DataSource)));

  // 🛡️ 4️⃣ Security headers with Helmet
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  }));

  // 🍪 5️⃣ Parse cookies for CSRF / JWT tokens
  app.use(cookieParser());

  // ⚠️ 6️⃣ Optional: CSRF protection (can enable later)
  // app.use(csurf({ cookie: true }));

  // 🚀 7️⃣ Start the server
  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
}
bootstrap();
