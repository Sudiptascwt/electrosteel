import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CompanyProfileService } from './company_profile.service';
// import { CompanyProfileDto } from '../../../dto/csr_projects.dto';
import { ApiKeyGuard } from 'src/common/api-key.guard'; 

@UseGuards(ApiKeyGuard) 
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly CompanyProfileService: CompanyProfileService) {}
}
