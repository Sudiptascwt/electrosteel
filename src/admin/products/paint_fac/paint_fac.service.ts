// src/fac/fac.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fac } from '../../../entity/paint_fac.entity';
import { CreateFacDto } from '../../../dto/paint_fac.dto';

// Complete service with multiple upsert strategies
@Injectable()
export class FacService {
  constructor(
    @InjectRepository(Fac)
    private facRepository: Repository<Fac>,
  ) {}

  // Standard CRUD methods
  async create(createFacDto: CreateFacDto): Promise<Fac> {
    const fac = this.facRepository.create(createFacDto);
    return await this.facRepository.save(fac);
  }

  async update(id: number, createFacDto: CreateFacDto): Promise<Fac> {
    await this.findOne(id);
    await this.facRepository.update(id, createFacDto);
    return this.findOne(id);
  }

  // UPSERT - Best practice for create or update together
  async upsert(id: number, createFacDto: CreateFacDto): Promise<Fac> {
    const existing = await this.facRepository.findOne({ where: { id } });
    
    if (existing) {
      // Update existing
      await this.facRepository.update(id, createFacDto);
      return this.findOne(id);
    } else {
      // Create new with specific ID
      const fac = this.facRepository.create({ ...createFacDto, id });
      return await this.facRepository.save(fac);
    }
  }

  // Upsert without checking existence first (more efficient for frequent updates)
  async upsertEfficient(id: number, createFacDto: CreateFacDto): Promise<Fac> {
    // Try to find existing
    let fac = await this.facRepository.findOne({ where: { id } });
    
    if (!fac) {
      fac = this.facRepository.create({ id });
    }
    
    // Merge the DTO data
    Object.assign(fac, createFacDto);
    
    // Save will insert if new or update if exists
    return await this.facRepository.save(fac);
  }

  // TypeORM built-in upsert (if using TypeORM 0.3.0+)
  async upsertNative(id: number, createFacDto: CreateFacDto): Promise<Fac> {
    await this.facRepository.upsert(
      { id, ...createFacDto },
      ['id'] // Conflict column(s)
    );
    return this.findOne(id);
  }

  // Batch upsert for multiple records
  async bulkUpsert(items: Array<{ id: number } & CreateFacDto>): Promise<Fac[]> {
    const results: Fac[] = [];
    
    for (const item of items) {
      const result = await this.upsert(item.id, item);
      results.push(result);
    }
    
    return results;
  }

  // Rest of your methods...
  async findAll(): Promise<Fac[]> {
    return await this.facRepository.find();
  }

  async findOne(id: number): Promise<Fac> {
    const fac = await this.facRepository.findOne({ where: { id } });
    if (!fac) {
      throw new NotFoundException(`Fac with ID ${id} not found`);
    }
    return fac;
  }

  async remove(id: number): Promise<void> {
    const result = await this.facRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fac with ID ${id} not found`);
    }
  }

  async seedDefault(): Promise<Fac> {
    const existing = await this.facRepository.findOne({ where: { id: 1 } });
    if (existing) return existing;

    const defaultFac = this.facRepository.create({
      id: 1,
      title: 'Industrial Paint Business Overview',
      description: '',
      card: [
        {
          title: 'Production Capacity',
          desc: '350 KL/month rated capacity with further expansion plans.',
        },
        {
          title: 'Facility Details',
          desc: `Located in Bansberia, Hooghly, West Bengal, our paint facility operates on a 2-acre site with 30% green coverage. We maintain full licensing compliance including Factory Licence (WB), PCB-CTO, Trade Licence, PESO and Fire Licence`,
        },
      ],
    });
    return await this.facRepository.save(defaultFac);
  }
}