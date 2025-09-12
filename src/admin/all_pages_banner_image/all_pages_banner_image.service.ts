import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllBanner } from '../../entity/all_page_banner_image.entity';
import { AllBannerDto } from '../../dto/all_page_banner_image.dto';

@Injectable()
export class AllBannerService {
  constructor(
    @InjectRepository(AllBanner)
    private readonly AllBannerRepo: Repository<AllBanner>,
  ) {}

  async create(createDto: AllBannerDto): Promise<AllBanner> {
    // if (createDto.title==null || createDto.description==null) {
    //     throw new BadRequestException ('Title or description are required');
    // }
    const unit = this.AllBannerRepo.create(createDto);
    return await this.AllBannerRepo.save(unit);
  }

  async findAll(): Promise<AllBanner[]> {
    return await this.AllBannerRepo.find();
  }

  async findById(id: number): Promise<AllBanner> {
    const unit = await this.AllBannerRepo.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('AllBanner unit not found');
    return unit;
  }

  async update(id: number, updateDto: AllBannerDto): Promise<AllBanner> {
    const unit = await this.findById(id);
    Object.assign(unit, updateDto);
    return await this.AllBannerRepo.save(unit);
  }

  async delete(id: number): Promise<void> {
    const result = await this.AllBannerRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('AllBanner unit not found');
    }
  }

  async findByPageName(pageName: string): Promise<AllBanner | null> {
    return await this.AllBannerRepo.findOne({
      where: { page_name: pageName },
    });
  }

}