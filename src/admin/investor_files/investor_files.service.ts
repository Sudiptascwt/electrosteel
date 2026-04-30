// src/investor/investor.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investor } from '../../entity/investor.entity';
import { InvestorDto } from '../../dto/investor.dto';

@Injectable()
export class InvestorService {
  constructor(
    @InjectRepository(Investor)
    private investorRepo: Repository<Investor>,
  ) {}

  // CREATE BULK
  async createBulk(data: any) {
    const records = [];

    for (const fy of data.financialYears) {
      for (const result of fy.results) {
        records.push({
          year: fy.year,
          title: result.title,
          date: result.date,
          src: result.src,
          category: result.category || fy.category || null
        });
      }
    }

    return await this.investorRepo.save(records);
  }

  // GET ALL (grouped response)
  async findAll() {
    const results = await this.investorRepo.find();

    const grouped = results.reduce((acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = [];
      }

      acc[item.year].push({
        id: item.id,
        title: item.title,
        date: item.date,
        src: item.src,
      });

      return acc;
    }, {} as Record<string, any[]>);

    return {
      financialYears: Object.keys(grouped).map(year => ({
        year,
        results: grouped[year],
      })),
    };
  }

  // GET BY YEAR
  async findByYear(year: string, category?: string, title?: string) {
      // Build query with optional filters
      let query = this.investorRepo.createQueryBuilder('investor')
          .where('investor.year = :year', { year });
      
      if (category) {
          query = query.andWhere('investor.category = :category', { category });
      }
      
      if (title) {
          query = query.andWhere('investor.title LIKE :title', { title: `%${title}%` });
      }
      
      const results = await query.getMany();
      
      return {
          financialYears: [
              {
                  year: year,
                  category: category || 'all',
                  results: results.map(record => ({
                      title: record.title,
                      date: record.date,
                      src: record.src,
                      category: record.category,
                  }))
              }
          ],
          totalCount: results.length
      };
  }

  // UPDATE (single record)
  async updateByYearAndCategory(body: any) {
      const yearToUpdate = body.financialYears?.[0]?.year;
      const categoryToUpdate = body.financialYears?.[0]?.category;
      
      if (!yearToUpdate) {
          throw new BadRequestException('Year is required');
      }
      
      if (!categoryToUpdate) {
          throw new BadRequestException('Category is required');
      }
      
      await this.investorRepo.delete({ 
          year: yearToUpdate,
          category: categoryToUpdate 
      });
      
      // CREATE new records
      const records = [];
      
      for (const fy of body.financialYears) {
          for (const result of fy.results) {
              records.push({
                  year: fy.year,
                  category: result.category || fy.category || categoryToUpdate,
                  title: result.title,
                  date: result.date,
                  src: result.src,
              });
          }
      }
      
      const saved = await this.investorRepo.save(records);
      
      return {
          message: `Records for year ${yearToUpdate} and category ${categoryToUpdate} updated successfully`,
          data: saved,
      };
  }

  // DELETE (optional)
  async delete(id: number) {
    const record = await this.investorRepo.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    await this.investorRepo.remove(record);
    return { message: 'Deleted successfully' };
  }

  async deleteByYear(year: string) {
    const result = await this.investorRepo.delete({ year });
    return {
      message: `${result.affected} records for ${year} deleted successfully`,
    };
  }

  async deleteById(id: number) {
    const record = await this.investorRepo.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    await this.investorRepo.remove(record);
    return {
      message: `Record with id ${id} deleted successfully`,
    };
  }
}