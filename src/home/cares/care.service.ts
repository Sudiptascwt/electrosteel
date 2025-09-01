import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CareDto } from '../../dto/care.dto';
import { Care } from '../../entity/care.entity';

@Injectable()
export class CareService {
    constructor(
    @InjectRepository(Care)
    private readonly CareRepository: Repository<Care>, 
  ) {}

  async createCare(data: CareDto, files: any) {
    const existingInvestor = await this.CareRepository.findOne({
      where: { title: data.title },
    });

    if (existingInvestor) {
      return {
        statusCode: 400,
        message: 'This care already exists',
      };
    }

    const care = this.CareRepository.create({
      ...data,
      image: files?.image ? files.image[0].filename : null,
      video_image: files?.video_image ? files.video_image[0].filename : null,
      icon_image: files?.icon_image ? files.icon_image[0].filename : null,
    });
    const newCare = this.CareRepository.create(care);
    await this.CareRepository.save(newCare);

    return {
      statusCode: 201,
      message: 'Investor created successfully.',
      data: newCare,
    };
  }

  // UPDATE CARE
  async updateCare(id: number, data: CareDto, files: any) {
    const care = await this.CareRepository.findOne({ where: { id } });

    if (!care) {
      throw new NotFoundException(`Care with ID ${id} not found`);
    }

    // Update fields and handle new images if uploaded
    Object.assign(care, data);

    if (files?.image) care.image = files.image[0].filename;
    if (files?.video_image) care.video_image = files.video_image[0].filename;
    if (files?.icon_image) care.icon_image = files.icon_image[0].filename;

    const updatedCare = await this.CareRepository.save(care);

    return {
      statusCode: 200,
      message: 'Care updated successfully.',
      data: updatedCare,
    };
  }

  // GET SINGLE CARE
  async getCareById(id: number) {
    const care = await this.CareRepository.findOne({ where: { id } });

    if (!care) {
      throw new NotFoundException(`Care with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Care fetched successfully.',
      data: care,
    };
  }

  // GET ALL CARES
  async getAllCares() {
    const cares = await this.CareRepository.find({
      order: { createdAt: 'DESC' },
    });

    return {
      statusCode: 200,
      message: 'Cares fetched successfully.',
      data: cares,
    };
  }

  async deleteCare(id: number) {
  const result = await this.CareRepository.delete(id);
  if (result.affected == 0) throw new NotFoundException(`care with ID ${id} not found`);

  return {
    statusCode: 200,
    message: 'Care deleted successfully',
  };
}
}



  // async updateInvestor(id: number, data: Partial<InvestorDto>) {
  //   const certificate = await this.investorRepository.findOne({ where: { id: id } });

  //   if (!certificate) {
  //     throw new NotFoundException('investor not found.');
  //   }

  //   if (data.title) {
  //     const isoExists = await this.investorRepository.findOne({
  //       where: {
  //         title: data.title,
  //         id: Not(id),
  //       },
  //     });

  //     if (isoExists) {
  //       return {
  //         statusCode: 400,
  //         message: 'Another investor with same title already exists.',
  //       };
  //     }
  //   }
  //   await this.investorRepository.update(id, data);
  //   return {
  //     statusCode: 200,
  //     message: 'Investor updated successfully',
  //   };
  // }

  // async getAllInvestors() {
  //   const investors = await this.investorRepository.find({ 
  //     order: { id: 'ASC' } 
  //   });

  //   return {
  //     statusCode: 200,
  //     message: 'Investors fetched successfully',
  //     data: investors,
  //   };
  // }


  // async getInvestorById(id: number) {
  //   const investor = await this.investorRepository.findOne({
  //     where: { id: id }, 
  //   });

  //   if (!investor) {
  //     return {
  //       statusCode: 404,
  //       message: 'Investor not found',
  //     };
  //   }

  //   return {
  //     statusCode: 200,
  //     message: 'Investor fetched successfully',
  //     data: investor,
  //   };
  // }


