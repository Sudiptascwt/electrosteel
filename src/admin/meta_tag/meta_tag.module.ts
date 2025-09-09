import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaTag } from '../../entity/meta_tag.entity';
import { MetaTagController } from './meta_tag.controller';
import { MetaTagService } from './meta_tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetaTag])],
  controllers: [MetaTagController],
  providers: [MetaTagService],
})
export class MetaTagModule {}
