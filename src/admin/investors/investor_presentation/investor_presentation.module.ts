import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestorPresentation } from '../../../entity/investor_presentation.entity';
import { InvestorPresentationController } from './investor_presentation.controller';
import { InvestorPresentationService } from './investor_presentation.service';
@Module({
  imports: [TypeOrmModule.forFeature([InvestorPresentation])],
  controllers: [InvestorPresentationController],
  providers: [InvestorPresentationService],
})
export class InvestorPresentationModule {}
