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
    async findByYearOrTitle(
        year?: string, 
        title?: string, 
        category?: string, 
        is_latest?: number,
        src_type?: string,
        heading?: string  // This parameter is now optional/not needed
    ) {
        let query = this.investorRepo.createQueryBuilder('investor');
        let hasCondition = false;
        
        if (year) {
            query = query.where('investor.year = :year', { year });
            hasCondition = true;
        }

        if (category) {
            if (hasCondition) {
                query = query.andWhere('investor.category = :category', { category });
            } else {
                query = query.where('investor.category = :category', { category });
                hasCondition = true;
            }
        }

        if (title) {
            if (hasCondition) {
                query = query.andWhere('investor.title LIKE :title', { title: `%${title}%` });
            } else {
                query = query.where('investor.title LIKE :title', { title: `%${title}%` });
                hasCondition = true;
            }
        }
        
        if (is_latest !== undefined) {
            if (hasCondition) {
                query = query.andWhere('investor.is_latest = :is_latest', { is_latest });
            } else {
                query = query.where('investor.is_latest = :is_latest', { is_latest });
                hasCondition = true;
            }
        }
        
        if (src_type) {
            if (hasCondition) {
                query = query.andWhere('investor.src_type = :src_type', { src_type });
            } else {
                query = query.where('investor.src_type = :src_type', { src_type });
                hasCondition = true;
            }
        }
        
        const results = await query.getMany();
        
        if (results.length === 0) {
            return {
                message: 'No records found',
                financialYears: [],
                totalCount: 0
            };
        }
        
        // Group by year and use heading from database
        const groupedByYear = results.reduce((acc, record) => {
            if (!acc[record.year]) {
                acc[record.year] = {
                    heading: record.heading,  // 👈 Get heading from the record
                    items: []
                };
            }
            acc[record.year].items.push({
                id: record.id,
                title: record.title,
                date: record.date,
                src: record.src,
                category: record.category,
                is_latest: record.is_latest,
                src_type: record.src_type,
            });
            return acc;
        }, {});
        
        // Convert to array format
        const financialYears = Object.keys(groupedByYear).map(year => ({
            year: year,
            heading: groupedByYear[year].heading,  // 👈 Heading from DB
            results: groupedByYear[year].items
        }));
        
        return {
            financialYears: financialYears,
            totalCount: results.length
        };
    }
}