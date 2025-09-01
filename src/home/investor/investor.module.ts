import { Module } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { InvestorController } from './investor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investor } from '../../entity/investor.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Investor]), 
  ],
  providers: [InvestorService],
  controllers: [InvestorController]
})
export class InvestorModule {}