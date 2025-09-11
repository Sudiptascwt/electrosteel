import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsLetter } from '../../../entity/news_letter.entity';
import { NewsLetterService } from './news_letter.service';
import { NewsLetterController } from './news_letter.controller';

@Module({
    imports: [TypeOrmModule.forFeature([NewsLetter])],
    controllers: [NewsLetterController],
    providers: [NewsLetterService],
})
export class NewsLetterModule {}
