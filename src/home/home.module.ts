import { Module } from '@nestjs/common';
import { HomesService } from './home.service';
import { HomesController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from '../entity/certificate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificate]), 
  ],
  providers: [HomesService],
  controllers: [HomesController]
})
export class HomesModule {}
