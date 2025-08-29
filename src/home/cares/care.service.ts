import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CareDto } from '../dto/care.dto';
import { Care } from '../entity/care.entity';

@Injectable()
export class CareService {
    constructor(
    @InjectRepository(Care)
    private readonly CareRepository: Repository<Care>, 
  ) {}

  async createCare(data: CareDto, file: Express.Multer.File) {
    const existingInvestor = await this.CareRepository.findOne({
      where: { title: data.title },
    });

    if (existingInvestor) {
      return {
        statusCode: 400,
        message: 'This investor already exists',
      };
    }

    // if (file) {
    //   data.pdf = file.filename;
    // }
    const newInvestor = this.CareRepository.create(data);
    await this.CareRepository.save(newInvestor);

    return {
      statusCode: 201,
      message: 'Care created successfully.',
      data: newInvestor,
    };
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

  // async deleteInvestor(id: number) {
  //   const result = await this.investorRepository.delete(id);
  //   if (result.affected == 0) throw new NotFoundException(`Banner with ID ${id} not found`);

  //   return {
  //     statusCode: 200,
  //     message: 'Banner deleted successfully',
  //   };
  // }
}