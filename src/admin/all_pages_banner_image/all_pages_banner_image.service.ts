// all_pages_banner_image.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { AllBanner } from '../../entity/all_page_banner_image.entity';
import { AllBannerDto } from '../../dto/all_page_banner_image.dto';

@Injectable()
export class AllBannerService {
  constructor(
    @InjectRepository(AllBanner)
    private readonly allBannerRepo: Repository<AllBanner>,
  ) {}

  async create(createDto: AllBannerDto): Promise<AllBanner> {
    const unit = this.allBannerRepo.create(createDto);
    return await this.allBannerRepo.save(unit);
  }

  async findAll(): Promise<AllBanner[]> {
    return await this.allBannerRepo.find({
      order: { id: 'DESC' },
    });
  }

  async findById(id: number): Promise<AllBanner> {
    const unit = await this.allBannerRepo.findOne({
      where: { id },
    });
    if (!unit) {
      throw new NotFoundException(`AllBanner unit with ID ${id} not found`);
    }
    return unit;
  }

  async findByPageName(page_name: string): Promise<AllBanner> {
    const unit = await this.allBannerRepo.findOne({
      where: { page_name: page_name },
    });
    if (!unit) {
      throw new NotFoundException(`Page with name "${page_name}" not found`);
    }
    return unit;
  }

  async update(id: number, updateDto: AllBannerDto): Promise<AllBanner> {
    const unit = await this.findById(id);
    Object.assign(unit, updateDto);
    return await this.allBannerRepo.save(unit);
  }

  async updateByPageName(page_name: string, updateDto: AllBannerDto): Promise<AllBanner> {
    // Find the record by page_name
    const unit = await this.allBannerRepo.findOne({
      where: { page_name: page_name }
    });
    
    if (!unit) {
      throw new NotFoundException(`Page with name "${page_name}" not found`);
    }
    
    // Remove page_name from update DTO to prevent changing the identifier
    const { page_name: _, ...updateData } = updateDto;
    
    // Update only the allowed fields
    Object.assign(unit, updateData);
    
    return await this.allBannerRepo.save(unit);
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.allBannerRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`AllBanner unit with ID ${id} not found`);
    }
    return result;
  }

  async deleteByPageName(page_name: string): Promise<DeleteResult> {
    const unit = await this.findByPageName(page_name);
    const result = await this.allBannerRepo.delete(unit.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Page with name "${page_name}" not found`);
    }
    return result;
  }
}