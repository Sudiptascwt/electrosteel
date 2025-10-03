import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendNewsletterController } from './news_letters.controller';
import { FrontendNewsletterService } from './news_letters.service';
import { NewsLetter } from 'src/entity/news_letter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsLetter])],
  controllers: [FrontendNewsletterController],
  providers: [FrontendNewsletterService],
})
export class FrontendNewsletterModule {}
