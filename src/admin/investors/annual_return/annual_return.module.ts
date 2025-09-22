import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnualReturn } from '../../../entity/annual_return.entity';
import { AnnualReturnController } from './annual_return.controller';
import { AnnualReturnService } from './annual_return.service';
@Module({
  imports: [TypeOrmModule.forFeature([AnnualReturn])],
  controllers: [AnnualReturnController],
  providers: [AnnualReturnService],
})
export class AnnualReturnModule {}
