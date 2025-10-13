import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FittingsInternalPipes } from 'src/entity/fittings_internal.entity';
import { FittingsInternalPipesDto } from 'src/dto/fittings_internal.dto';

@Injectable()
export class FittingsInternalService {
    constructor(
        @InjectRepository(FittingsInternalPipes)
        private readonly internalpipeDetailsRepository: Repository<FittingsInternalPipes>,
    ) {}

    // CREATE
    async create(createDto: FittingsInternalPipesDto) {
        const newinternalpipe = this.internalpipeDetailsRepository.create(createDto);
        const savedinternalpipe = await this.internalpipeDetailsRepository.save(newinternalpipe);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Fittings internal pipe created successfully',
            data: savedinternalpipe,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.internalpipeDetailsRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'All Fittings internal pipes fetched successfully' : 'No Fittings internal pipe found',
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
                message: `Fittings internal pipe with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fittings internal pipe fetched successfully',
            data: internalpipe,
        };
    }

    // UPDATE
    async update(id: number, updateDto: FittingsInternalPipesDto) {
        const internalpipe = await this.internalpipeDetailsRepository.findOne({ where: { id } });
        if (!internalpipe) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Fittings internal pipe with ID ${id} not found`,
            });
        }
        Object.assign(internalpipe, updateDto);
        const updatedinternalpipe = await this.internalpipeDetailsRepository.save(internalpipe);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fittings internal pipe details updated successfully',
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
                message: `Fittings internal pipe with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fittings internal pipe deleted successfully'
        };
    }
}
