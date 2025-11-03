import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendClosureController } from './closures.controller';
import { FrontendClosureService } from './closures.service';
import { Disclosure } from 'src/entity/disclosure.entity';
import { OtherDisclosure } from 'src/entity/other_disclosures.entity';
import { DisclosureImages } from 'src/entity/disclosure_images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disclosure, OtherDisclosure, DisclosureImages])],
  controllers: [FrontendClosureController],
  providers: [FrontendClosureService],
})
export class FrontendClosureModule {}