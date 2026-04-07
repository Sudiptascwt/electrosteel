import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityResults } from '../../entity/pipe_art.entity';
import { QualityResultsDto } from '../../dto/pipe_art.dto';
import { QualityResultsDetail } from 'src/entity/pipe_art_details.entity';

@Injectable()
export class QualityResultsService {
    constructor(
        @InjectRepository(QualityResults)
        private readonly QualityResultsRepository: Repository<QualityResults>,

        @InjectRepository(QualityResultsDetail)
        private readonly pipeDetailsRepository: Repository<QualityResultsDetail>,
    ) {}

    // ------------------- PIPE ART CRUD -------------------

    // CREATE PIPE ART
    async create(createDto: QualityResultsDto) {
        const newQualityResults = this.QualityResultsRepository.create(createDto);
        const savedQualityResults = await this.QualityResultsRepository.save(newQualityResults);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'QualityResults created successfully',
            data: savedQualityResults,
        };
    }

    // GET ALL PIPE ARTS WITH DETAILS
    async findAll() {
        const data = await this.QualityResultsRepository.find({
            relations: ['details'], 
        });

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'QualityResults details fetched successfully' : 'No QualityResults details found',
            data,
        };
    }

    // GET PIPE ART BY ID WITH DETAILS
    async findById(id: number) {
        const QualityResults = await this.QualityResultsRepository.findOne({
            where: { id },
            relations: ['details'], 
        });

        if (!QualityResults) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `QualityResults with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'QualityResults fetched successfully',
            data: QualityResults,
        };
    }

    // UPDATE PIPE ART
    async update(id: number, updateDto: QualityResultsDto) {
        const QualityResults = await this.QualityResultsRepository.findOne({ where: { id } });

        if (!QualityResults) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `QualityResults with ID ${id} not found`,
            });
        }

        Object.assign(QualityResults, updateDto);
        const updatedQualityResults = await this.QualityResultsRepository.save(QualityResults);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'QualityResults updated successfully',
            data: updatedQualityResults,
        };
    }

    // DELETE PIPE ART
    async delete(id: number) {
        const result = await this.QualityResultsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `QualityResults with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'QualityResults deleted successfully',
            data: null,
        };
    }
}
