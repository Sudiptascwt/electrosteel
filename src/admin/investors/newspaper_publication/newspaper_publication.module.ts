import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsPaperPublication } from '../../../entity/newspaper_publication.entity';
import { NewspaperPublicationController } from './newspaper_publication.controller';
import { NewspaperPublicationService } from './newspaper_publication.service';
@Module({
  imports: [TypeOrmModule.forFeature([NewsPaperPublication])],
  controllers: [NewspaperPublicationController],
  providers: [NewspaperPublicationService],
})
export class NewspaperPublicationModule {}
