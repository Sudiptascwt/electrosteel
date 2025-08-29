import { Module } from '@nestjs/common';
import { CareService } from './care.service';
import { CareController } from './care.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Care } from '../entity/care.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Care]), 
  ],
  providers: [CareService],
  controllers: [CareController]
})
export class CareModule {}