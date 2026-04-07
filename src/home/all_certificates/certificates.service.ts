import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllCertificate } from '../../entity/all_certificates.entity';
import { AllCertificatesDto } from '../../dto/all_certificates.dto';

@Injectable()
export class AllCertificatesService {
  constructor(
    @InjectRepository(AllCertificate)
    private readonly repo: Repository<AllCertificate>,
  ) {}

  // CREATE
  async create(dto: AllCertificatesDto, files: any) {
    const entity = this.repo.create({
      ...dto,
      icon_image: files?.icon_image ? files.icon_image[0].filename : null,
      video_image: files?.video_image ? files.video_image[0].filename : null,
      pdf: files?.pdf ? files.pdf[0].filename : null,
      pdf2: files?.pdf2 ? files.pdf2[0].filename : null,
    });

    const saved = await this.repo.save(entity);

    return {
      statusCode: 201,
      message: 'Certificate created successfully.',
      data: saved,
    };
  }

  // UPDATE
  async update(id: number, dto: AllCertificatesDto, files: any) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }

    Object.assign(entity, dto);

    if (files?.icon_image) entity.icon_image = files.icon_image[0].filename;
    if (files?.video_image) entity.video_image = files.video_image[0].filename;
    if (files?.pdf) entity.pdf = files.pdf[0].filename;
    if (files?.pdf2) entity.pdf2 = files.pdf2[0].filename;

    const updated = await this.repo.save(entity);

    return {
      statusCode: 200,
      message: 'Certificate updated successfully.',
      data: updated,
    };
  }

  // DELETE
  async delete(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Certificate deleted successfully.',
    };
  }

  // GET BY ID
  async getById(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Certificate fetched successfully.',
      data: entity,
    };
  }

  // GET ALL
  async getAll() {
    const entities = await this.repo.find({ order: { created_at: 'DESC' } });

    return {
      statusCode: 200,
      message: 'Certificates fetched successfully.',
      data: entities,
    };
  }
}
