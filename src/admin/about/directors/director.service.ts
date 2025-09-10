import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directors } from '../../../entity/director.entity';
import { DirectorsDto } from '../../../dto/director.dto';

@Injectable()
export class DirectorService {
    constructor(
        @InjectRepository(Directors)
        private readonly DirectorsRepository: Repository<Directors>,
    ) {}

    // CREATE
    async create(createDto: DirectorsDto) {
        try {
        const newDirectors = this.DirectorsRepository.create(createDto);
        const savedDirectors = await this.DirectorsRepository.save(newDirectors);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Director created successfully',
            data: savedDirectors,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Directors',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.DirectorsRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Directors fetched successfully' : 'No Directors found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.DirectorsRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Director with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Director fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: DirectorsDto) {
        const About = await this.DirectorsRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Director with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.DirectorsRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Director updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.DirectorsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Director with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Director deleted successfully'
        };
    }
}
