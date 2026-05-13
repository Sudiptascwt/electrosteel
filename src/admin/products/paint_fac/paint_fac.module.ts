// src/fac/fac.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacService } from './paint_fac.service';
import { FacController } from './paint_fac.controller';
import { Fac } from '../../../entity/paint_fac.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fac])],
  controllers: [FacController],
  providers: [FacService],
  exports: [FacService],
})
export class FacModule {}