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
import { CareersService } from './careers.service';
// import { CareerDto } from '../../../dto/csr_projects.dto';
import { ApiKeyGuard } from 'src/common/api-key.guard'; 

@UseGuards(ApiKeyGuard) 
@Controller('frontend/careers')
export class CareersController {
  constructor(private readonly CareerService: CareersService) {}

  @Get()
  async getCareerData() {
    return this.CareerService.getCareerData();
  }
}
