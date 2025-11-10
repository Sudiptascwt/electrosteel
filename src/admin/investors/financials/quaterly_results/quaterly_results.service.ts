import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityResults } from '../../../../entity/quaterly_results.entity';
import { QualityResultsDto } from '../../../../dto/quaterly_results.dto';

@Injectable()
export class QualityResultsService {
  constructor(
    @InjectRepository(QualityResults)
    private readonly QualityResultsRepo: Repository<QualityResults>,
  ) {}

    // CREATE
    async create(createDto: QualityResultsDto) {
        if (Array.isArray(createDto.title)) {
            createDto.title = createDto.title.join(',');
        }
        if (Array.isArray(createDto.pdf)) {
            createDto.pdf = createDto.pdf.join(',');
        }

        const office = this.QualityResultsRepo.create(createDto);
        const data = await this.QualityResultsRepo.save(office);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Quality result created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.QualityResultsRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality result fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.QualityResultsRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `Quality result with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality result fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: QualityResultsDto) {
        if (Array.isArray(updateDto.title)) {
            updateDto.title = updateDto.title.join(',');
        }
        if (Array.isArray(updateDto.pdf)) {
            updateDto.pdf = updateDto.pdf.join(',');
        }

        await this.QualityResultsRepo.update(id, updateDto);

        const data = await this.QualityResultsRepo.findOneBy({ id });
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality result updated successfully',
            data,
        };
    }

    // DELETE
    async delete(id: number) {
        const office = await this.QualityResultsRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `Quality result with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.QualityResultsRepo.remove(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality result deleted successfully',
        };
    }
}
