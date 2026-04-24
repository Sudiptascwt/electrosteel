import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductInnovationHeroSection } from '../../../entity/product_innovation_hero_section.entity';
import { ElectrolockJoint  } from '../../../entity/electrolock_joint.entity';
import { TrenchlessDIPipes } from '../../../entity/trenchless-di-pipes.entity';
import { PolyurethaneLining } from '../../../entity/polyurethane-lining.entity';
import { PolyurethaneCoating } from '../../../entity/polyurethane-coating.entity';
import { LegendEclVideo } from 'src/entity/legend_ecl_video_section.entity';
import { LegendEclVideoDto } from 'src/dto/legend_ecl_video_section.dto';
import { LegendEclCard } from 'src/entity/legend_ecl_cards.entity';
import { LegendEclCardDto } from 'src/dto/legend_ecl_cards.dto';
import { LegendHeroSection } from 'src/entity/legend_of_ecl_hero.entity';
import { LegendHeroSectionDto } from 'src/dto/legend_of_ecl_hero.dto';

@Injectable()
export class ProductInnovationService {
  constructor(
    @InjectRepository(ProductInnovationHeroSection)
    private readonly heroSectionRepository: Repository<ProductInnovationHeroSection>,

    @InjectRepository(ElectrolockJoint)
    private readonly electrolockJointRepository: Repository<ElectrolockJoint>,

    @InjectRepository(TrenchlessDIPipes)
    private readonly trenchlessDIPipesRepository: Repository<TrenchlessDIPipes>,

    @InjectRepository(PolyurethaneLining)
    private readonly polyurethaneLiningRepository: Repository<PolyurethaneLining>,

    @InjectRepository(PolyurethaneCoating)
    private readonly polyurethaneCoatingRepository: Repository<PolyurethaneCoating>,
  ) {}

  private getRepositoryBySection(section: string): Repository<any> {
    switch (section) {
      case 'hero-section':
        return this.heroSectionRepository;
      case 'electrolock-joint':
        return this.electrolockJointRepository;
      case 'trenchless-di-pipes':
        return this.trenchlessDIPipesRepository;
      case 'polyurethane-lining':
        return this.polyurethaneLiningRepository;
      case 'polyurethane-coating':
        return this.polyurethaneCoatingRepository;
      default:
        throw new BadRequestException('Invalid section name');
    }
  }

    async getSection(section: string) {
      const repository = this.getRepositoryBySection(section);

      const records = await repository.find({
          order: { created_at: 'ASC' },
          take: 1,
      });

      return {
          status: true,
          statusCode: 200,
          message: `${section} fetched successfully`,
          data: records[0] || null,
      };
    }

    async saveOrUpdateSection(section: string, payload: any) {
      const repository = this.getRepositoryBySection(section);

      const existingRecords = await repository.find({
          order: { created_at: 'ASC' },
          take: 1,
      });

      const existingRecord = existingRecords[0];

      if (existingRecord) {
        Object.assign(existingRecord, payload);

        const savedRecord = await repository.save(existingRecord);

        return {
          status: true,
          statusCode: 200,
          message: `${section} updated successfully`,
          data: savedRecord,
        };
      }

      const newRecord = repository.create(payload);
      const savedRecord = await repository.save(newRecord);

      return {
        status: true,
        statusCode: 201,
        message: `${section} created successfully`,
        data: savedRecord,
      };
    }
}