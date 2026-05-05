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

  // CREATE SINGLE (for your new data format)
  async create(data: {
    year: string;
    category: string;
    results: Array<{
      title: string;
      date: string;
      src: string;
      is_latest?: boolean;
      src_type: string,
      category?: string;
    }>;
  }) {
    const records = [];

    // Process the single FY object
    for (const result of data.results) {
      records.push({
        year: data.year,
        title: result.title,
        date: result.date,
        src: result.src,
        is_latest: result.is_latest || 0,
        src_type: result.src_type || 'pdf',
        category: result.category || data.category || null
      });
    }

    const saved = await this.investorRepo.save(records);
    
    return {
      message: `${saved.length} records created successfully for ${data.year}`,
      data: saved,
    };
  }

  // CREATE BULK (for backward compatibility with array format)
  async createBulk(data: any) {
    const records = [];

    // Check if data is array or object with financialYears property
    if (data.financialYears && Array.isArray(data.financialYears)) {
      // Old format: { financialYears: [...] }
      for (const fy of data.financialYears) {
        for (const result of fy.results) {
          records.push({
            year: fy.year,
            title: result.title,
            date: result.date,
            src: result.src,
            is_latest: result.is_latest || 0,
            src_type: result.src_type || 'pdf',
            category: result.category || fy.category || null
          });
        }
      }
    } else if (Array.isArray(data)) {
      // Array of FY objects
      for (const fy of data) {
        for (const result of fy.results) {
          records.push({
            year: fy.year,
            title: result.title,
            date: result.date,
            src: result.src,
            is_latest: result.is_latest || 0,
            src_type: result.src_type || 'pdf',
            category: result.category || fy.category || null
          });
        }
      }
    } else if (data.year && data.results) {
      // Single object format
      for (const result of data.results) {
        records.push({
          year: data.year,
          title: result.title,
          date: result.date,
          src: result.src,
          is_latest: result.is_latest || 0,
          src_type: result.src_type || 'pdf',
          category: result.category || data.category || null
        });
      }
    }

    if (records.length === 0) {
      throw new BadRequestException('No valid records to create');
    }

    return await this.investorRepo.save(records);
  }

  // GET ALL (grouped response)
  async findAll(is_latest?: number, category?: string, year?: string) {
      let query = this.investorRepo.createQueryBuilder('investor');
      
      if (is_latest !== undefined) {
          query = query.andWhere('investor.is_latest = :is_latest', { is_latest });
      }
      if (category) {
          query = query.andWhere('investor.category = :category', { category });
      }
      if (year) {
          query = query.andWhere('investor.year = :year', { year });
      }
      
      const results = await query.getMany();
      
      // Group by year AND category combination
      const grouped = results.reduce((acc, item) => {
          const key = `${item.year}_${item.category}`;
          
          if (!acc[key]) {
              acc[key] = {
                  year: item.year,
                  category: item.category,
                  results: []
              };
          }
          
          // Don't include category in individual results
          acc[key].results.push({
              id: item.id,
              title: item.title,
              date: item.date,
              src: item.src,
              is_latest: item.is_latest,
              src_type: item.src_type || 'pdf',
          });
          
          return acc;
      }, {} as Record<string, any>);
      
      return {
          financialYears: Object.values(grouped)
      };
  }

  // GET ALL GROUPED BY YEAR AND CATEGORY
  async findAllGroupedByCategory() {
    const results = await this.investorRepo.find();

    const grouped = results.reduce((acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = {};
      }
      if (!acc[item.year][item.category]) {
        acc[item.year][item.category] = [];
      }

      acc[item.year][item.category].push({
        id: item.id,
        title: item.title,
        date: item.date,
        src: item.src,
        is_latest: item.is_latest,
        src_type: item.src_type || 'pdf',
      });

      return acc;
    }, {} as Record<string, Record<string, any[]>>);

    return {
      financialYears: Object.keys(grouped).map(year => ({
        year,
        categories: Object.keys(grouped[year]).map(category => ({
          category,
          results: grouped[year][category],
        })),
      })),
    };
  }

  // GET BY YEAR
  async findByYear(year: string, category?: string, title?: string) {
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
                    is_latest: record.is_latest,
                    src_type: record.src_type || 'pdf',
                    category: record.category,
                }))
            }
        ],
        totalCount: results.length
    };
  }

  // UPDATE (supports both formats)
  async update(data: any) {
    let yearToUpdate: string;
    let categoryToUpdate: string;
    let results: any[];

    // Handle different input formats
    if (data.financialYears && Array.isArray(data.financialYears)) {
      // Old format
      yearToUpdate = data.financialYears[0]?.year;
      categoryToUpdate = data.financialYears[0]?.category;
      results = data.financialYears[0]?.results || [];
    } else {
      // New single object format
      yearToUpdate = data.year;
      categoryToUpdate = data.category;
      results = data.results || [];
    }
    
    if (!yearToUpdate) {
        throw new BadRequestException('Year is required');
    }
    
    // Update: delete existing records for this year and category
    if (categoryToUpdate) {
      await this.investorRepo.delete({ 
          year: yearToUpdate,
          category: categoryToUpdate 
      });
    } else {
      await this.investorRepo.delete({ year: yearToUpdate });
    }
    
    // CREATE new records
    const records = [];
    
    for (const result of results) {
        records.push({
            year: yearToUpdate,
            category: result.category || categoryToUpdate || null,
            title: result.title,
            date: result.date,
            src: result.src,
            is_latest: result.is_latest || 0,
            src_type: result.src_type || 'pdf',
        });
    }
    
    const saved = records.length > 0 ? await this.investorRepo.save(records) : [];
    
    return {
        message: `Records for year ${yearToUpdate}${categoryToUpdate ? ` and category ${categoryToUpdate}` : ''} updated successfully`,
        data: saved,
    };
  }

  // UPDATE by year and category (original method)
  async updateByYearAndCategory(body: any) {
      let yearToUpdate: string;
      let categoryToUpdate: string;
      let resultsArray: any[];
      
      // Check if data is in old format (with financialYears array) or new format (direct)
      if (body.financialYears && Array.isArray(body.financialYears)) {
          // Old format: { financialYears: [...] }
          yearToUpdate = body.financialYears[0]?.year;
          categoryToUpdate = body.financialYears[0]?.category;
          resultsArray = body.financialYears;
      } else if (body.year && body.results) {
          // New format: direct object
          yearToUpdate = body.year;
          categoryToUpdate = body.category;
          resultsArray = [body]; // Wrap single object in array for consistent processing
      } else {
          throw new BadRequestException('Invalid data format. Expected either { financialYears: [...] } or { year, category, results }');
      }
      
      if (!yearToUpdate) {
          throw new BadRequestException('Year is required');
      }
      
      if (!categoryToUpdate) {
          throw new BadRequestException('Category is required');
      }
      
      // Delete existing records
      await this.investorRepo.delete({ 
          year: yearToUpdate,
          category: categoryToUpdate 
      });
      
      // Create new records
      const records = [];
      
      for (const fy of resultsArray) {
          for (const result of fy.results) {
              records.push({
                  year: fy.year || yearToUpdate,
                  category: result.category || fy.category || categoryToUpdate,
                  title: result.title,
                  date: result.date,
                  src: result.src,
                  is_latest: result.is_latest || 0,
                  src_type: result.src_type || 'pdf',
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

  async deleteByYearAndCategory(year: string, category: string) {
    const result = await this.investorRepo.delete({ year, category });
    return {
      message: `${result.affected} records for ${year} and category ${category} deleted successfully`,
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