import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyDetails } from 'src/entity/company_details.entity';
import { CompanyDetailsDto } from '../../../dto/company_details.dto';

@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(CompanyDetails)
    private readonly CompanyProfileRepo: Repository<CompanyDetails>,
  ) {}

  async getCompanyProfileData() {
    const company_profile = await this.CompanyProfileRepo.find({
    });
    return {
      statusCode: 200,
      message:
        company_profile.length > 0
          ? 'Company details fetched successfully'
          : 'No company details found',
      data: company_profile,
    };
  }
}