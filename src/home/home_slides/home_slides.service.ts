import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { home_slides } from '../../entity/home_slides.entity';

@Injectable()
export class home_slidesService {
  constructor(
    @InjectRepository(home_slides)
    private slidesRepo: Repository<home_slides>,
  ) {}

  async findOne(id: number): Promise<home_slides> {
    return await this.slidesRepo.findOneBy({ id });
  }

  // For creating slide
  async create(data: Partial<home_slides>): Promise<home_slides> {
    const slide = this.slidesRepo.create(data);
    return await this.slidesRepo.save(slide);
  }

  // For updating slide
  async update(id: number, data: Partial<home_slides>): Promise<void> {
    await this.slidesRepo.update(id, data);
  }
}