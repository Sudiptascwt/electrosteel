import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pipes_section } from '../../entity/pipes_section.entity';
import { pipes_sectionDto } from '../../dto/pipes_section.dto';

@Injectable()
export class pipes_sectionService {
    constructor(
        @InjectRepository(pipes_section)
        private readonly pipes_sectionRepository: Repository<pipes_section>,
    ) {}

    // CREATE
    async create(createDto: pipes_sectionDto) {
        const newpipes_section = this.pipes_sectionRepository.create(createDto);
        const savedpipes_section = await this.pipes_sectionRepository.save(newpipes_section);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'pipes_section created successfully',
            data: savedpipes_section,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.pipes_sectionRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'pipes_section fetched successfully' : 'No pipes_section found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const pipes_section = await this.pipes_sectionRepository.findOne({ where: { id } });
        if (!pipes_section) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `pipes_section with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'pipes_section fetched successfully',
            data: pipes_section,
        };
    }

    // UPDATE
    async update(id: number, updateDto: pipes_sectionDto) {
        const pipes_section = await this.pipes_sectionRepository.findOne({ where: { id } });
        if (!pipes_section) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `pipes_section with ID ${id} not found`,
            });
        }

        Object.assign(pipes_section, updateDto);
        const updatedpipes_section = await this.pipes_sectionRepository.save(pipes_section);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'pipes_section updated successfully',
            data: updatedpipes_section,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.pipes_sectionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `pipes_section with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'pipes_section deleted successfully'
        };
    }
}
