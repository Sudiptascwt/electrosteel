// src/investor/investor.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investor } from '../../entity/investor.entity';
import { InvestorDto } from '../../dto/investor.dto';
import { NodalOfficer } from 'src/entity/nodal_officer.entity';
import { NodalOfficerDto } from 'src/dto/nodal_officer.dto';

@Injectable()
export class InvestorService {
  constructor(
    @InjectRepository(Investor)
    private investorRepo: Repository<Investor>,
    @InjectRepository(NodalOfficer)
    private repo: Repository<NodalOfficer>,
  ) {}

  // CREATE SINGLE (for your new data format)
  async create(data: {
    year: string;
    category: string;
    heading: string;
    ref_id: string;
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
  // async createBulk(data: any) {
  //   const records = [];

  //   // Check if data is array or object with financialYears property
  //   if (data.financialYears && Array.isArray(data.financialYears)) {
  //     // Old format: { financialYears: [...] }
  //     for (const fy of data.financialYears) {
  //       for (const result of fy.results) {
  //         records.push({
  //           year: fy.year,
  //           title: result.title,
  //           date: result.date,
  //           src: result.src,
  //           is_latest: result.is_latest || 0,
  //           src_type: result.src_type || 'pdf',
  //           category: result.category || fy.category || null
  //         });
  //       }
  //     }
  //   } else if (Array.isArray(data)) {
  //     // Array of FY objects
  //     for (const fy of data) {
  //       for (const result of fy.results) {
  //         records.push({
  //           year: fy.year,
  //           title: result.title,
  //           date: result.date,
  //           src: result.src,
  //           is_latest: result.is_latest || 0,
  //           src_type: result.src_type || 'pdf',
  //           category: result.category || fy.category || null
  //         });
  //       }
  //     }
  //   } else if (data.year && data.results) {
  //     // Single object format
  //     for (const result of data.results) {
  //       records.push({
  //         year: data.year,
  //         title: result.title,
  //         date: result.date,
  //         src: result.src,
  //         is_latest: result.is_latest || 0,
  //         src_type: result.src_type || 'pdf',
  //         category: result.category || data.category || null
  //       });
  //     }
  //   }

  //   if (records.length === 0) {
  //     throw new BadRequestException('No valid records to create');
  //   }

  //   return await this.investorRepo.save(records);
  // }

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
              category: result.category || fy.category || null,
              heading: fy.heading || null,  // ← Added heading support
              ref_id: fy.ref_id || null
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
              category: result.category || fy.category || null,
              heading: fy.heading || null,  // ← Added heading support
              ref_id: fy.ref_id
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
            category: result.category || data.category || null,
            heading: data.heading || null,  // ← Added heading support
            ref_id: data.ref_id
          });
        }
      }

      if (records.length === 0) {
        throw new BadRequestException('No valid records to create');
      }

      // Save records to database
      const savedRecords = await this.investorRepo.save(records);

      // Group records by year and category for structured response
      const groupedByYearAndCategory = savedRecords.reduce((acc, record) => {
        const year = record.year;
        const category = record.category || 'Uncategorized';
        const heading = record.heading;  // ← Get heading from record
        const ref_id =record.ref_id;
        
        if (!acc[year]) {
          acc[year] = {
            heading: heading,  // ← Add heading at year level
            ref_id: ref_id,
            categories: {}
          };
        }
        
        if (!acc[year].categories[category]) {
          acc[year].categories[category] = [];
        }
        
        acc[year].categories[category].push(record);
        
        return acc;
      }, {});

      // Format the response with headings
      const formattedResponse = {
        message: 'Bulk records created successfully',
        totalRecords: savedRecords.length,
        data: groupedByYearAndCategory,
        summary: Object.keys(groupedByYearAndCategory).map(year => ({
          year: year,
          heading: groupedByYearAndCategory[year].heading,  // ← Include heading in summary
          ref_id: groupedByYearAndCategory[year].ref_id,
          categories: Object.keys(groupedByYearAndCategory[year].categories).map(category => ({
            category: category,
            count: groupedByYearAndCategory[year].categories[category].length
          }))
        }))
      };

      return formattedResponse;
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
                  heading: item.heading,
                  ref_id: item.ref_id,
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
  // async updateByYearAndCategory(body: any) {
  //     let yearToUpdate: string;
  //     let categoryToUpdate: string;
  //     let resultsArray: any[];
      
  //     // Check if data is in old format (with financialYears array) or new format (direct)
  //     if (body.financialYears && Array.isArray(body.financialYears)) {
  //         // Old format: { financialYears: [...] }
  //         yearToUpdate = body.financialYears[0]?.year;
  //         categoryToUpdate = body.financialYears[0]?.category;
  //         resultsArray = body.financialYears;
  //     } else if (body.year && body.results) {
  //         // New format: direct object
  //         yearToUpdate = body.year;
  //         categoryToUpdate = body.category;
  //         resultsArray = [body]; // Wrap single object in array for consistent processing
  //     } else {
  //         throw new BadRequestException('Invalid data format. Expected either { financialYears: [...] } or { year, category, results }');
  //     }
      
  //     if (!yearToUpdate) {
  //         throw new BadRequestException('Year is required');
  //     }
      
  //     if (!categoryToUpdate) {
  //         throw new BadRequestException('Category is required');
  //     }
      
  //     // Delete existing records
  //     await this.investorRepo.delete({ 
  //         year: yearToUpdate,
  //         category: categoryToUpdate 
  //     });
      
  //     // Create new records
  //     const records = [];
      
  //     for (const fy of resultsArray) {
  //         for (const result of fy.results) {
  //             records.push({
  //                 year: fy.year || yearToUpdate,
  //                 category: result.category || fy.category || categoryToUpdate,
  //                 title: result.title,
  //                 date: result.date,
  //                 src: result.src,
  //                 is_latest: result.is_latest || 0,
  //                 src_type: result.src_type || 'pdf',
  //             });
  //         }
  //     }
      
  //     const saved = await this.investorRepo.save(records);
      
  //     return {
  //         message: `Records for year ${yearToUpdate} and category ${categoryToUpdate} updated successfully`,
  //         data: saved,
  //     };
  // }

  async updateByRefId(body: any) {
      let refIdToUpdate: string;
      let yearToUpdate: string | null = null;
      let categoryToUpdate: string | null = null;
      let headingToUpdate: string | null;
      let resultsArray: any[];
      
      // Check if data is in old format (with financialYears array) or new format (direct)
      if (body.financialYears && Array.isArray(body.financialYears)) {
          // Old format: { financialYears: [...] }
          refIdToUpdate = body.financialYears[0]?.ref_id;
          yearToUpdate = body.financialYears[0]?.year || null;
          categoryToUpdate = body.financialYears[0]?.category || null;
          headingToUpdate = body.financialYears[0]?.heading || null;
          resultsArray = body.financialYears;
      } else if (body.ref_id && body.results) {
          // New format: direct object
          refIdToUpdate = body.ref_id;
          yearToUpdate = body.year || null;
          categoryToUpdate = body.category || null;
          headingToUpdate = body.heading || null;
          resultsArray = [body];
      } else {
          throw new BadRequestException('Invalid data format. Expected either { financialYears: [...] } or { ref_id, year, category, heading, results }');
      }
      
      if (!refIdToUpdate) {
          throw new BadRequestException('ref_id is required');
      }
      
      // Build delete query
      const deleteQuery: any = { ref_id: refIdToUpdate };
      if (yearToUpdate) {
          deleteQuery.year = yearToUpdate;
      }
      if (categoryToUpdate) {
          deleteQuery.category = categoryToUpdate;
      }
      
      // Delete existing records
      const deleted = await this.investorRepo.delete(deleteQuery);
      
      // Create new records
      const records = [];
      
      for (const fy of resultsArray) {
          for (const result of fy.results) {
              records.push({
                  ref_id: fy.ref_id || refIdToUpdate,
                  year: fy.year || yearToUpdate,
                  category: result.category || fy.category || categoryToUpdate,
                  title: result.title,
                  date: result.date,
                  src: result.src,
                  is_latest: result.is_latest || 0,
                  src_type: result.src_type || 'pdf',
                  heading: headingToUpdate || fy.heading || null
              });
          }
      }
      
      const saved = await this.investorRepo.save(records);
      
      return {
          message: `Records with ref_id ${refIdToUpdate}${yearToUpdate ? ` and year ${yearToUpdate}` : ''}${categoryToUpdate ? ` and category ${categoryToUpdate}` : ''} updated successfully`,
          deletedCount: deleted.affected || 0,
          heading: headingToUpdate,
          totalRecords: saved.length,
          data: saved,
      };
  }

  // DELETE (optional)
  async delete(ref_id: string) {
    const record = await this.investorRepo.findOne({ where: { ref_id } });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    await this.investorRepo.remove(record);
    return { message: 'Deleted successfully' };
  }

  async deleteByYear(ref_id: string) {
    const result = await this.investorRepo.delete({ ref_id });
    return {
      message: `${result.affected} records for ${ref_id} deleted successfully`,
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
  
  // Create or Update - one function for both
  async save(data: NodalOfficerDto): Promise<any> {
    const existingRecord = await this.repo.findOne({ 
      where: { name: data.name } 
    });
    
    if (existingRecord) {
      await this.repo.update(existingRecord.id, data);
      const updated = await this.repo.findOne({ where: { id: existingRecord.id } });
      return {
        message: `Record with name "${data.name}" updated successfully`,
        data: updated,
      };
    } else {
      const saved = await this.repo.save(data);
      return {
        message: `Record created successfully`,
        data: saved,
      };
    }
  }

  // Get - get all or get one by id
  async get(id?: number): Promise<any> {
    if (id) {
      const data = await this.repo.findOne({ where: { id } });
      return {
        message: `Record fetched successfully`,
        data: data,
      };
    }
    const data = await this.repo.find();
    return {
      message: `Records fetched successfully`,
      data: data,
    };
  }
}