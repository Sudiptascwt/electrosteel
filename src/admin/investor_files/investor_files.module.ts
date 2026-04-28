// src/investor/investor.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investor } from '../../entity/investor.entity';
import { InvestorService } from './investor_files.controller';
import { InvestorController } from './investor_files.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Investor])],
  controllers: [InvestorController],
  providers: [InvestorService],
})
export class InvestorModule {}