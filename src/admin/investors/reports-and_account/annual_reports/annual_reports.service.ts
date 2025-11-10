import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnualReports } from '../../../../entity/annual_reports.entity';
import { AnnualReportsDto } from '../../../../dto/annual_reports.dto';

@Injectable()
export class AnnualReportsService {
  constructor(
    @InjectRepository(AnnualReports)
    private readonly AnnualReportsRepo: Repository<AnnualReports>,
  ) {}

    // CREATE
    async create(createDto: AnnualReportsDto) {
        if (Array.isArray(createDto.title)) {
            createDto.title = createDto.title.join(',');
        }
        if (Array.isArray(createDto.pdf)) {
            createDto.pdf = createDto.pdf.join(',');
        }

        const office = this.AnnualReportsRepo.create(createDto);
        const data = await this.AnnualReportsRepo.save(office);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Annual Report created successfully',
            data,
        };
        }

        // GET ALL
    async findAll() {
        const data = await this.AnnualReportsRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Annual Report fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.AnnualReportsRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `Annual Report with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Annual Report fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: AnnualReportsDto) {
        if (Array.isArray(updateDto.title)) {
            updateDto.title = updateDto.title.join(',');
        }
        if (Array.isArray(updateDto.pdf)) {
            updateDto.pdf = updateDto.pdf.join(',');
        }

        await this.AnnualReportsRepo.update(id, updateDto);

        const data = await this.AnnualReportsRepo.findOneBy({ id });
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Annual Report updated successfully',
            data,
        };
    }

    // DELETE
    async delete(id: number) {
        const office = await this.AnnualReportsRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `Annual Report with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.AnnualReportsRepo.remove(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Annual Report deleted successfully',
        };
    }
}
