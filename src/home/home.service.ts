import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CertificateDto } from '../dto/certificate.dto';
import { Certificate } from '../entity/certificate.entity';

@Injectable()
export class HomesService {
    constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>, 
  ) {}

  async createCertificate(data: CertificateDto) {
    const existingCertificate = await this.certificateRepository.findOne({ where: { iso_number: data.iso_number } });
    console.log("existingCertificate",existingCertificate);
    
    if (existingCertificate) {  
      return {
        statusCode: 400,
        message: 'Certificate with this title already exists',
      };
    }
    const newCertificate = this.certificateRepository.create(data); 
    await this.certificateRepository.save(newCertificate);     

    return {
      statusCode: 201,
      message: 'Certificate created successfully',
      data: newCertificate,
    };
  }

  async updateCertificate(id: number, data: Partial<CertificateDto>) {
    const certificate = await this.certificateRepository.findOne({ where: { id: id } });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    if (data.iso_number) {
      const isoExists = await this.certificateRepository.findOne({
        where: {
          iso_number: data.iso_number,
          id: Not(id),
        },
      });

      if (isoExists) {
        return {
          statusCode: 400,
          message: 'Another certificate with this ISO number already exists',
        };
      }
    }

    await this.certificateRepository.update(id, data);

    return {
      statusCode: 200,
      message: 'Certificate updated successfully',
    };
  }

  // delete certificate for home banner
  async deleteCertificate(id: number) {
    const certificate = await this.certificateRepository.findOne({ where: { id: id } });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }
    await this.certificateRepository.delete (id);

    return {
      statusCode: 200,
      message: 'Certificate deleted successfully',
    };
  }

  // Inactivate certificate for home banner
  async inactiveCertificate(id: number) {
    const certificate = await this.certificateRepository.findOne({ where: { id: id } });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }
    const data = { status: 0 };
    await this.certificateRepository.update(id, data);

    return {
      statusCode: 200,
      message: 'Certificate inactivated successfully',
    };
  }

 async getCertificate(id: number) {
    const certificate = await this.certificateRepository.findOne({ where: { id: id } });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }
    return {
      statusCode: 200,
      message: 'Certificate fetched successfully',
      data: certificate,
    };
  }

  async getAllCertificates() {
    const certificates = await this.certificateRepository.find();
    return {
      statusCode: 200,
      message: 'Certificates fetched successfully',
      data: certificates,
    };

  }

}