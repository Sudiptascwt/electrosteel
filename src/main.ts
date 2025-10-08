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
import csurf from 'csurf';
import cookieParser from 'cookie-parser'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Electrosteel API')
    .setDescription('API documentation for Electrosteel project')
    .setVersion('1.0')
    .addBearerAuth() // If you have JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // **Add global exception filter here**
  app.useGlobalFilters(new AllExceptionsFilter(app.get(DataSource)));
  // app.use(helmet());
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"], // only allow scripts from your domain
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  }));
  app.use(cookieParser());
  // // app.use(csurf({ cookie: true }));
  // app.use('/api', csurf({ ignoreMethods: ['GET', 'POST', 'PUT', 'DELETE'] }));


  await app.listen(3000);
}
bootstrap();
