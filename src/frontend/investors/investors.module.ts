// src/investor/investor.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investor } from '../../entity/investor.entity';
import {InvestorService} from './investors.service';
import { InvestorController } from './investors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Investor])],
  controllers: [InvestorController],
  providers: [InvestorService],
})
export class FrontendInvestorModule {}