import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disclosure } from '../../../entity/disclosure.entity';
import { DisclosuresController } from './disclosures.controller';
import { DisclosuresService } from './disclosures.service';
import { DisclosureImages } from 'src/entity/disclosure_images.entity';
import { OtherDisclosure } from 'src/entity/other_disclosures.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Disclosure, DisclosureImages, OtherDisclosure])],
  controllers: [DisclosuresController],
  providers: [DisclosuresService],
})
export class DisclosuresModule {}