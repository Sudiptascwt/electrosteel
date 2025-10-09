import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalPipes } from '../../../../entity/pipes_internal.entity'
import { InternalPipesDto } from '../../../../dto/pipes_internal.dto'

@Injectable()
export class InternalPipesService {
    constructor(
        @InjectRepository(InternalPipes)
        private readonly internalpipeDetailsRepository: Repository<InternalPipes>,
    ) {}

    // CREATE
    async create(createDto: InternalPipesDto) {
        const newinternalpipe = this.internalpipeDetailsRepository.create(createDto);
        const savedinternalpipe = await this.internalpipeDetailsRepository.save(newinternalpipe);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Internal pipe created successfully',
            data: savedinternalpipe,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.internalpipeDetailsRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Internal pipe details fetched successfully' : 'No Internal pipe details found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const internalpipe = await this.internalpipeDetailsRepository.findOne({ where: { id } });
        if (!internalpipe) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Internal pipe with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Internal pipe details fetched successfully',
            data: internalpipe,
        };
    }

    // UPDATE
    async update(id: number, updateDto: InternalPipesDto) {
        const internalpipe = await this.internalpipeDetailsRepository.findOne({ where: { id } });
        if (!internalpipe) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Internal pipe with ID ${id} not found`,
            });
        }

        Object.assign(internalpipe, updateDto);
        const updatedinternalpipe = await this.internalpipeDetailsRepository.save(internalpipe);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Internal pipe updated successfully',
            data: updatedinternalpipe,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.internalpipeDetailsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Internal pipe with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Internal pipe deleted successfully',
        };
    }
}
