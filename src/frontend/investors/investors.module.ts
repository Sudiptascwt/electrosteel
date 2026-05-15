// src/investor/investor.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investor } from '../../entity/investor.entity';
import {InvestorService} from './investors.service';
import { InvestorController } from './investors.controller';
import { NodalOfficer } from 'src/entity/nodal_officer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Investor, NodalOfficer])],
  controllers: [InvestorController],
  providers: [InvestorService],
})
export class FrontendInvestorModule {}