import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../../../entity/reports.entity';
import { ReportDto } from '../../../dto/reports.dto';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly ReportRepository: Repository<Report>,
    ) {}

    // CREATE
    async create(dto: ReportDto) {
        const report = new Report();
        report.start_date = dto.start_date;
        report.end_date = dto.end_date;
        report.title = JSON.stringify(dto.title);
        report.pdf = JSON.stringify(dto.pdf);

        return await this.ReportRepository.save(report);
    }

    // GET ALL
    async findAll() {
        const data = await this.ReportRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Report fetched successfully' : 'No Report found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const Report = await this.ReportRepository.findOne({ where: { id } });
        if (!Report) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Report with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Report fetched successfully',
            data: Report,
        };
    }

    // UPDATE
    // async update(id: number, updateDto: ReportDto) {
    //     const Report = await this.ReportRepository.findOne({ where: { id } });
    //     if (!Report) {
    //         throw new NotFoundException({
    //             status: false,
    //             statusCode: HttpStatus.NOT_FOUND,
    //             message: `Report with ID ${id} not found`,
    //         });
    //     }

    //     Object.assign(Report, updateDto);
    //     const updatedReport = await this.ReportRepository.save(Report);

    //     return {
    //         status: true,
    //         statusCode: HttpStatus.OK,
    //         message: 'Report updated successfully',
    //         data: updatedReport,
    //     };
    // }
    async update(id: number, updateDto: ReportDto) {
        const report = await this.ReportRepository.findOne({ where: { id } });

        if (!report) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Report with ID ${id} not found`,
            });
        }
        if (updateDto.title && Array.isArray(updateDto.title)) {
            report.title = JSON.stringify(updateDto.title);
        }
        if (updateDto.pdf && Array.isArray(updateDto.pdf)) {
            report.pdf = JSON.stringify(updateDto.pdf);
        }
        if (updateDto.start_date) {
            report.start_date = updateDto.start_date;
        }

        if (updateDto.end_date) {
            report.end_date = updateDto.end_date;
        }

        const updatedReport = await this.ReportRepository.save(report);

        updatedReport.title = JSON.parse(updatedReport.title);
        updatedReport.pdf = JSON.parse(updatedReport.pdf);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Report updated successfully',
            data: updatedReport,
        };
    }


    // DELETE
    async delete(id: number) {
        const result = await this.ReportRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Report with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Report deleted successfully'
        };
    }
}
