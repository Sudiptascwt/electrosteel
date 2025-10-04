import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendNewsPaperPublicationController } from './news_paper_publication.controller';
import { FrontendNewsPaperPublicationService } from './news_paper_publication.service';
import { NewsPaperPublication } from 'src/entity/newspaper_publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsPaperPublication])],
  controllers: [FrontendNewsPaperPublicationController],
  providers: [FrontendNewsPaperPublicationService],
})
export class FrontendNewsPaperPublicationModule {}
