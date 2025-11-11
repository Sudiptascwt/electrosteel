import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessEnquiry } from '../../entity/business_enquery.entity';
import { BusinessEnquiryDto } from '../../dto/business_enquery.dto';
import { ShareholderEnquiry } from 'src/entity/shareholder_enquiry.entity';
import { ShareholderEnquiryDto } from 'src/dto/shareholder_enquiry.dto';
import { CareerEnquiryDto } from 'src/dto/career_enquiry.dto';
import { CareerEnquiry } from 'src/entity/career_enquiry.entity';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectRepository(BusinessEnquiry)
    private readonly EnquiryRepo: Repository<BusinessEnquiry>,

    @InjectRepository(ShareholderEnquiry)
    private readonly ShareholderRepo: Repository<ShareholderEnquiry>,

    @InjectRepository(CareerEnquiry)
    private readonly CareerEnquiryRepo: Repository<CareerEnquiry>,
  ) {}

  async create(createDto: BusinessEnquiryDto): Promise<BusinessEnquiry> {
    const unit = this.EnquiryRepo.create(createDto);
    return await this.EnquiryRepo.save(unit);
  }

  async findAll(): Promise<BusinessEnquiry[]> {
    return await this.EnquiryRepo.find();
  }

  async findById(id: number): Promise<BusinessEnquiry> {
    const unit = await this.EnquiryRepo.findOne({ where: { id } });
    if (!unit) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Enquiry unit not found`,
      });
    }
    return unit;
  }
  ///////shareholder/////////
  async createShareHolderEnquiry(createDto: ShareholderEnquiryDto): Promise<ShareholderEnquiry> {
    const unit = this.ShareholderRepo.create(createDto);
    return await this.ShareholderRepo.save(unit);
  }

  async findAllShareHolderEnquiries(): Promise<ShareholderEnquiry[]> {
    return await this.ShareholderRepo.find();
  }

  async findShareHolderEnquiryById(id: number): Promise<ShareholderEnquiry> {
    const unit = await this.ShareholderRepo.findOne({ where: { id } });
    if (!unit) {
      throw new NotFoundException({
        status: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: `Shareholder enquiry unit not found`,
      });
    }
    return unit;
  }
  ////////career/////////
  async createCareerEnquiry(createDto: CareerEnquiryDto): Promise<CareerEnquiry> {
    const unit = this.CareerEnquiryRepo.create(createDto);
    return await this.CareerEnquiryRepo.save(unit);
  }

  async findAllCareerEnquiries(): Promise<CareerEnquiry[]> {
    return await this.CareerEnquiryRepo.find();
  }

  async findCareerEnquiryById(id: number): Promise<CareerEnquiry> {
    const unit = await this.CareerEnquiryRepo.findOne({ where: { id } });
    if (!unit) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Shareholder enquiry unit not found`,
      });
    }
    return unit;
  }
}