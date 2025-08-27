import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificateDto } from './dto/certificate.dto';
import { Certificate } from './entity/certificate.entity';

@Injectable()
export class HomeService {
    constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>, 
  ) {}

  async createCertificate(data: CertificateDto) {
    const newCertificate = this.certificateRepository.create(data); 
    await this.certificateRepository.save(newCertificate);     

    return {
      statusCode: 201,
      message: 'Certificate created successfully',
      data: newCertificate,
    };
}

//   getAllCertificates() {
//     return {
//       statusCode: 200,
//       message: 'Certificates fetched successfully',
//       data: this.certificates,
//     };
//   }
}