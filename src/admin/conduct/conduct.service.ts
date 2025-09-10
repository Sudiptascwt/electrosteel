import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conduct } from '../../entity/conduct.entity';
import { ConductDto } from '../../dto/conduct.dto';

@Injectable()
export class ConductService {
    constructor(
        @InjectRepository(Conduct)
        private readonly ConductRepository: Repository<Conduct>,
    ) {}

    // CREATE
    async create(createDto: ConductDto) {
        const newConduct = this.ConductRepository.create(createDto);
        const savedConduct = await this.ConductRepository.save(newConduct);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Conduct created successfully',
            data: savedConduct,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.ConductRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Conduct fetched successfully' : 'No Conduct found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const Conduct = await this.ConductRepository.findOne({ where: { id } });
        if (!Conduct) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Conduct with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Conduct fetched successfully',
            data: Conduct,
        };
    }

    // UPDATE
    async update(id: number, updateDto: ConductDto) {
        const Conduct = await this.ConductRepository.findOne({ where: { id } });
        if (!Conduct) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Conduct with ID ${id} not found`,
            });
        }

        Object.assign(Conduct, updateDto);
        const updatedConduct = await this.ConductRepository.save(Conduct);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Conduct updated successfully',
            data: updatedConduct,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.ConductRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Conduct with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Conduct deleted successfully'
        };
    }
}
