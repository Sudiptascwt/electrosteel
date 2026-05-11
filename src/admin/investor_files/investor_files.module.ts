// src/investor/investor.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investor } from '../../entity/investor.entity';
import { InvestorService } from './investor_files.controller';
import { InvestorController } from './investor_files.controller';
import { NodalOfficer } from '../../entity/nodal_officer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Investor, NodalOfficer])],
  controllers: [InvestorController],
  providers: [InvestorService],
})
export class InvestorModule {}