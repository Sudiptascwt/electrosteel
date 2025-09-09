import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaTag } from '../../entity/meta_tag.entity';
import { MetaTagDto } from '../../dto/meta_tag.dto';

@Injectable()
export class MetaTagService {
  constructor(
    @InjectRepository(MetaTag)
    private readonly MetaTagRepo: Repository<MetaTag>,
  ) {}

  async create(createDto: MetaTagDto): Promise<MetaTag> {
      if (
          createDto.meta_title == null || 
          createDto.meta_keyword == null || 
          createDto.meta_description == null
      ) {
          throw new BadRequestException('Meta title or Meta description or Meta Keyword are required');
      }
      const unit = this.MetaTagRepo.create(createDto);
      return await this.MetaTagRepo.save(unit);
  }


  async findAll(): Promise<MetaTag[]> {
    return await this.MetaTagRepo.find();
  }

  async findById(id: number): Promise<MetaTag> {
    const unit = await this.MetaTagRepo.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('MetaTag unit not found');
    return unit;
  }

  async update(id: number, updateDto: MetaTagDto): Promise<MetaTag> {
    const unit = await this.findById(id);
    Object.assign(unit, updateDto);
    return await this.MetaTagRepo.save(unit);
  }

  async delete(id: number): Promise<void> {
    const result = await this.MetaTagRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('MetaTag unit not found');
    }
  }
}