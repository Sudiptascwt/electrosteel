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
import { EnquiryService } from './Enquiry.service';
import { BusinessEnquiryDto } from '../../dto/business_enquery.dto';
import { ApiKeyGuard } from 'src/common/api-key.guard'; 
import { ShareholderEnquiryDto } from 'src/dto/shareholder_enquiry.dto';
import { CareerEnquiryDto } from 'src/dto/career_enquiry.dto';

@UseGuards(ApiKeyGuard) 
@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly EnquiryService: EnquiryService) {}

  /////business enquiry/////
  // CREATE
  @Post('business')
  async create(@Body() createDto: BusinessEnquiryDto) {
    const data = await this.EnquiryService.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Business enquiry created successfully',
      data,
    };
  }

  // GET ALL
  @Get('business')
  async findAll() {
    const data = await this.EnquiryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Business enquiry details fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get('business/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.EnquiryService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Business enquiry details fetched successfully',
      data,
    };
  }

//   // UPDATE
//   @Put('business/:id')
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateDto: BusinessEnquiryDto,
//   ) {
//     const data = await this.EnquiryService.update(id, updateDto);
//     return {
//       statusCode: HttpStatus.OK,
//       message: 'Business enquiry details updated successfully',
//       data,
//     };
//   }

//   // DELETE
//   @Delete('business/:id')
//   async delete(@Param('id', ParseIntPipe) id: number) {
//     await this.EnquiryService.delete(id);
//     return {
//       statusCode: HttpStatus.OK,
//       message: 'Business enquiry details deleted successfully',
//     };
//   }

//////shareholder enquiry////
  @Post('shareholder')
  async createShareHolderEnquiry(@Body() createDto: ShareholderEnquiryDto) {
    const data = await this.EnquiryService.createShareHolderEnquiry(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Shareholder enquiry created successfully',
      data,
    };
  }

  // GET ALL
  @Get('shareholder')
  async findAllShareHolderEnquiries() {
    const data = await this.EnquiryService.findAllShareHolderEnquiries();
    return {
      statusCode: HttpStatus.OK,
      message: 'All Shareholder enquiry details fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get('shareholder/:id')
  async findShareHolderEnquiryById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.EnquiryService.findShareHolderEnquiryById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Shareholder enquiry details fetched successfully',
      data,
    };
  }

  /////career enquiry//////
  @Post('career')
  async createCareerEnquiry(@Body() createDto: CareerEnquiryDto) {
    const data = await this.EnquiryService.createCareerEnquiry(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Career enquiry created successfully',
      data,
    };
  }

  // GET ALL
  @Get('career')
  async findAllCareerEnquiries() {
    const data = await this.EnquiryService.findAllCareerEnquiries();
    return {
      statusCode: HttpStatus.OK,
      message: 'All Career enquiry details fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get('career/:id')
  async findCareerEnquiryById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.EnquiryService.findCareerEnquiryById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Career enquiry details fetched successfully',
      data,
    };
  }
}
