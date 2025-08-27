import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './entity/certificate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificate]), 
  ],
  providers: [HomeService],
  controllers: [HomeController]
})
export class HomeModule {}
