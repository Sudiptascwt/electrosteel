import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendAnnualReturnController } from './annual_return.controller';
import { FrontendAnnualReturnService } from './annual_return.service';
import { AnnualReturn } from 'src/entity/annual_return.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnualReturn])],
  controllers: [FrontendAnnualReturnController],
  providers: [FrontendAnnualReturnService],
})
export class FrontendAnnualReturnModule {}
