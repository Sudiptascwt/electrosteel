// src/investor/investor.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
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

  // ✅ CREATE BULK (nested → flat)
  async createBulk(data: any) {
    const records = [];

    for (const fy of data.financialYears) {
      for (const result of fy.results) {
        records.push({
          year: fy.year,
          title: result.title,
          date: result.date,
          src: result.src,
        });
      }
    }

    return await this.investorRepo.save(records);
  }

  // ✅ GET ALL (grouped response)
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

  // ✅ GET BY YEAR
  async findByYear(year: string) {
    const results = await this.investorRepo.find({ where: { year } });

    return {
      year,
      results,
    };
  }

  // ✅ UPDATE (single record)
  async update(id: number, body: any) {
    const record = await this.investorRepo.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    Object.assign(record, body);

    return await this.investorRepo.save(record);
  }

  // ✅ DELETE (optional)
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
      message: `Deleted ${result.affected} records for ${year}`,
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