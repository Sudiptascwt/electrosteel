import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CompanyProfile } from '../../../entity/csr_projects.entity';
// import { CompanyProfileDto } from '../../../dto/csr_projects.dto';

@Injectable()
export class CompanyProfileService {
  constructor(
    // @InjectRepository(CompanyProfile)
    // private readonly CompanyProfileRepo: Repository<CompanyProfile>,
  ) {}
}