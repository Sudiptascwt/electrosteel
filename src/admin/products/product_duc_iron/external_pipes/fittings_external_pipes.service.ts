import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FittingsExternalPipes } from 'src/entity/fittings_external.entity';
import { FittingsExternalPipesDto } from 'src/dto/fittings_external.dto';

@Injectable()
export class FittingsExternalsService {
    constructor(
        @InjectRepository(FittingsExternalPipes)
        private readonly externalpipeDetailsRepository: Repository<FittingsExternalPipes>,
    ) {}

    // CREATE
    async create(createDto: FittingsExternalPipesDto) {
        const newexternalpipe = this.externalpipeDetailsRepository.create(createDto);
        const savedexternalpipe = await this.externalpipeDetailsRepository.save(newexternalpipe);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Fittings external pipe created successfully',
            data: savedexternalpipe,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.externalpipeDetailsRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'All fittings external pipes fetched successfully' : 'No fittings external pipe found',
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
                message: `Fittings external pipe with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fittings external pipe fetched successfully',
            data: externalpipe,
        };
    }

    // UPDATE
    async update(id: number, updateDto: FittingsExternalPipesDto) {
        const externalpipe = await this.externalpipeDetailsRepository.findOne({ where: { id } });
        if (!externalpipe) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Fittings external pipe with ID ${id} not found`,
            });
        }
        Object.assign(externalpipe, updateDto);
        const updatedexternalpipe = await this.externalpipeDetailsRepository.save(externalpipe);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fittings external pipe details updated successfully',
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
                message: `Fittings external pipe with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fittings external pipe deleted successfully'
        };
    }
}
