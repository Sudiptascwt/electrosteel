import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalPipes } from 'src/entity/pipes_external.entity';
import { ExternalPipesDto } from 'src/dto/pipes_external.dto';

@Injectable()
export class ExternalPipesService {
    constructor(
        @InjectRepository(ExternalPipes)
        private readonly externalpipeDetailsRepository: Repository<ExternalPipes>,
    ) {}

    // CREATE
    async create(createDto: ExternalPipesDto) {
        const newexternalpipe = this.externalpipeDetailsRepository.create(createDto);
        const savedexternalpipe = await this.externalpipeDetailsRepository.save(newexternalpipe);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'External pipe details created successfully',
            data: savedexternalpipe,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.externalpipeDetailsRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'External pipe details fetched successfully' : 'No external pipe found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const externalpipe = await this.externalpipeDetailsRepository.findOne({ where: { id } });
        if (!externalpipe) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `External pipe with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'External pipe fetched successfully',
            data: externalpipe,
        };
    }

    // UPDATE
    async update(id: number, updateDto: ExternalPipesDto) {
        const externalpipe = await this.externalpipeDetailsRepository.findOne({ where: { id } });
        if (!externalpipe) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `External pipe with ID ${id} not found`,
            });
        }
        Object.assign(externalpipe, updateDto);
        const updatedexternalpipe = await this.externalpipeDetailsRepository.save(externalpipe);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'External pipe updated successfully',
            data: updatedexternalpipe,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.externalpipeDetailsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `External pipe with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'External pipe deleted successfully'
        };
    }
}
