import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalPresence } from '../../entity/global_presense.entity';
import { GlobalPresenceDto } from '../../dto/global_presense.dto';

@Injectable()
export class GlobalPresenceService {
  constructor(
    @InjectRepository(GlobalPresence)
    private readonly GlobalRepo: Repository<GlobalPresence>,
  ) {}

  async createGlobalPresence(data: GlobalPresenceDto) {
    const newGlobal = this.GlobalRepo.create(data);
    await this.GlobalRepo.save(newGlobal);
    return { statusCode: 201, message: 'Global Presence created successfully.', data: newGlobal };
  }

  async updateGlobalPresence(id: number, data: GlobalPresenceDto) {
    const Global = await this.GlobalRepo.findOne({ where: { id } });
    if (!Global) throw new NotFoundException(`Global Presence ID ${id} not found`);

    Object.assign(Global, data);
    const updatedGlobal = await this.GlobalRepo.save(Global);
    return { statusCode: 200, message: 'Global Presence updated successfully.', data: updatedGlobal };
  }

  async getGlobalPresenceById(id: number) {
    const Global = await this.GlobalRepo.findOne({ where: { id } });
    if (!Global) throw new NotFoundException(`Global Presence ID ${id} not found`);
    return { statusCode: 200, message: 'Global fetched successfully.', data: Global };
  }

  async getAllGlobalPresence() {
    const global = await this.GlobalRepo.find();
    return { statusCode: 200, message: 'All global fetched successfully.', data: global };
  }

  async deleteGlobalPresence(id: number) {
    const Global = await this.GlobalRepo.findOne({ where: { id } });
    if (!Global) throw new NotFoundException(`Global Presence ID ${id} not found`);
    await this.GlobalRepo.delete(id);
    return { statusCode: 200, message: 'Global Presence deleted' };
  }
}

