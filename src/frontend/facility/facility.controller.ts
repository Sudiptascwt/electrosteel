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
import { FrontendFacilityService } from './facility.service';
import { FacilityDto } from '../../dto/facility.dto';
import { ApiKeyGuard } from 'src/common/api-key.guard'; 

@UseGuards(ApiKeyGuard) 
@Controller('frontend/facility')
export class FrontendFacilityController {
  constructor(private readonly FacilityService: FrontendFacilityService) {}
  // GET ALL
  @Get()
  async findAll() {
    const data = await this.FacilityService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Facilities fetched successfully',
      data,
    };
  }

  // GET BY ID
//   @Get(':id')
//   async findById(@Param('id', ParseIntPipe) id: number) {
//     const data = await this.ManufacturingService.findById(id);
//     return {
//       statusCode: HttpStatus.OK,
//       message: 'Manufacturing unit details fetched successfully',
//       data,
//     };
//   }
}
