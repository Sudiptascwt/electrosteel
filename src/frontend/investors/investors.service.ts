import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investor } from '../../entity/investor.entity';

@Injectable()
export class InvestorService {
  constructor(
    @InjectRepository(Investor)
    private investorRepo: Repository<Investor>,
  ) {}
  
  // GET BY YEAR OR TITLE
  async findByYearOrTitle(year?: string, title?: string, category?: string) {
      let query = this.investorRepo.createQueryBuilder('investor');
      let hasCondition = false;
      
      // Handle year filter
      if (year) {
          query = query.where('investor.year = :year', { year });
          hasCondition = true;
      }

      // Handle category filter (use andWhere if year already exists)
      if (category) {
          if (hasCondition) {
              query = query.andWhere('investor.category = :category', { category });
          } else {
              query = query.where('investor.category = :category', { category });
              hasCondition = true;
          }
      }
      
      // Handle title filter
      if (title) {
          if (hasCondition) {
              query = query.andWhere('investor.title LIKE :title', { title: `%${title}%` });
          } else {
              query = query.where('investor.title LIKE :title', { title: `%${title}%` });
          }
      }
      
      const results = await query.getMany();
      
      if (results.length === 0) {
          return {
              message: 'No records found',
              financialYears: []
          };
      }

      const groupedByYear = results.reduce((acc, record) => {
          if (!acc[record.year]) {
              acc[record.year] = [];
          }
          acc[record.year].push({
              title: record.title,
              date: record.date,
              src: record.src,
          });
          return acc;
      }, {});
      
      const financialYears = Object.keys(groupedByYear).map(year => ({
          year: year,
          results: groupedByYear[year]
      }));
      
      return {
          financialYears: financialYears,
          totalCount: results.length
      };
  }
}