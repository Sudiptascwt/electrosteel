import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnualReturn } from 'src/entity/annual_return.entity';
import { Disclosure } from 'src/entity/disclosure.entity';
import { DisclosureImages } from 'src/entity/disclosure_images.entity';
import { OtherDisclosure } from 'src/entity/other_disclosures.entity';


@Injectable()
export class FrontendClosureService {
  constructor(
    @InjectRepository(Disclosure)
    private readonly DisclosureRepo: Repository<Disclosure>,
    @InjectRepository(DisclosureImages)
    private readonly DisclosureImagesRepo: Repository<DisclosureImages>,
    @InjectRepository(OtherDisclosure)
    private readonly OtherDisclosureRepo: Repository<OtherDisclosure>,
  ) {}

  async getDisclosureData() {
    const disclosure = await this.DisclosureRepo.find({ relations: ['images'] });
    return {
      statusCode: 200,
      message: disclosure.length > 0 
        ? 'Disclosure data fetched successfully' 
        : 'No disclosure data found',
      data: disclosure,
    };
  }

  async getOtherDisclosureData() {
    const other_disclosures = await this.OtherDisclosureRepo.find();
    return {
      statusCode: 200,
      message: other_disclosures.length > 0 
        ? 'Other disclosure data fetched successfully' 
        : 'No other disclosure data found',
      data: other_disclosures,
    };
  }
}
