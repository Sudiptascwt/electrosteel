import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vision } from '../../../entity/vision.entity';
import { VisionDto } from '../../../dto/vision.dto';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(Vision)
        private readonly VisionRepository: Repository<Vision>,
    ) {}

    // CREATE
    async create(createDto: VisionDto) {
        try {
        const newVision = this.VisionRepository.create(createDto);
        const savedVision = await this.VisionRepository.save(newVision);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Vision created successfully',
            data: savedVision,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Vision',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.VisionRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Vision fetched successfully' : 'No Vision found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.VisionRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Vision with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Vision fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: VisionDto) {
        const About = await this.VisionRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Vision with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.VisionRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Vision updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.VisionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Vision with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Vision deleted successfully'
        };
    }
}
