import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendCreditRatingsController } from './credit_ratings.controller';
import { FrontendCreditRatingsService } from './credit_ratings.service';
import { CreditRatings } from 'src/entity/credit_ratings.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CreditRatings])],
  controllers: [FrontendCreditRatingsController],
  providers: [FrontendCreditRatingsService],
})
export class FrontendCreditRatingsModule {}