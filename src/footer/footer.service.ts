import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { FooterDto } from '../../dto/advertisement.dto';
// import { Footer } from
import { Advertisement } from 'src/entity/advertisement.entity';
import { AdvertisementDto } from 'src/dto/advertisement.dto';

@Injectable()
export class FooterService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly repo: Repository<Advertisement>,
  ) {}

  async create(data: AdvertisementDto) {
    const section = this.repo.create(data);
    const saved = await this.repo.save(section);
    return { statusCode: 201, message: 'Advertisement created successfully', data: saved };
  }

  async update(id: number, data: Partial<AdvertisementDto>) {
    const section = await this.repo.findOne({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
    Object.assign(section, data);
    const saved = await this.repo.save(section);
    return { statusCode: 200, message: 'Advertisement updated successfully', data: saved };
  }

  async getAll() {
    const sections = await this.repo.find({ order: { created_at: 'DESC' } });
    return { statusCode: 200, message: 'Advertisements fetched successfully', data: sections };
  }

  async getById(id: number) {
    const section = await this.repo.findOne({ where: { id } });
    if (!section) throw new NotFoundException('Advertisement not found');
    return { statusCode: 200, message: 'Advertisement fetched successfully', data: section };
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Advertisement not found');
    return { statusCode: 200, message: 'Advertisement deleted successfully' };
  }
}
