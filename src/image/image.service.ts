import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entity/image_file.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly fileRepo: Repository<Image>,
  ) {}

  // Save uploaded file
  async create(fileData: Partial<Image>) {
    const file = this.fileRepo.create(fileData);
    return this.fileRepo.save(file);
  }

  // Get all files
  findAll() {
    return this.fileRepo.find();
  }

  // Get file by ID
  findOne(id: number) {
    return this.fileRepo.findOne({ where: { id } });
  }

  // Update file metadata (description)
  async update(id: number, updateData: Partial<Image>) {
    console.log("updateData0",updateData);
    
    await this.fileRepo.update(id, updateData);
    return this.findOne(id);
  }

  // Delete file
  async remove(id: number) {
    const file = await this.findOne(id);
    if (!file) return null;

    // Delete file from filesystem
    const fs = require('fs');
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return this.fileRepo.delete(id);
  }
}
