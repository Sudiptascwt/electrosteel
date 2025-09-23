import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditRatings } from '../../../entity/credit_ratings.entity';
import { CreditRatingsController } from './credit_ratings.controller';
import { CreditRatingsService } from './credit_ratings.service';
@Module({
  imports: [TypeOrmModule.forFeature([CreditRatings])],
  controllers: [CreditRatingsController],
  providers: [CreditRatingsService],
})
export class CreditRatingsModule {}
