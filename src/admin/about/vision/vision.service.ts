import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vision } from '../../../entity/vision.entity';
import { VisionDto } from '../../../dto/vision.dto';
import { VisionPrinciples } from '../../../entity/vision_principles.entity';
import { VisionPrinciplesDto } from '../../../dto/vision_principles.dto';   

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(Vision)
        private readonly VisionRepository: Repository<Vision>,
        @InjectRepository(VisionPrinciples)
        private readonly VisionPrinciplesRepository: Repository<VisionPrinciples>,
    ) {}

    // CREATE
    async create(dto: VisionDto) {
    try {
        const existing = await this.VisionRepository.find({
        });
        let saved;
        if (existing) {
            Object.assign(existing, dto);
            saved = await this.VisionRepository.save(existing);

            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'Vision updated successfully',
                data: saved,
            };
        }

        const created = this.VisionRepository.create(dto);
        saved = await this.VisionRepository.save(created);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Vision created successfully',
            data: saved,
        };

    } catch (error) {
        return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
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

    // CREATE
    async createPrinciples(createDto: VisionPrinciplesDto) {
        try {
        const newVision = this.VisionPrinciplesRepository.create(createDto);
        const savedVision = await this.VisionPrinciplesRepository.save(newVision);

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
    async findAllPrinciples() {
        const data = await this.VisionPrinciplesRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Vision fetched successfully' : 'No Vision found',
            data,
        };
    }

    // GET BY ID
    async findPrinciplesById(id: number) {
        const About = await this.VisionPrinciplesRepository.findOne({ where: { id } });
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
    async updatePrinciples(id: number, updateDto: VisionPrinciplesDto) {
        const About = await this.VisionPrinciplesRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Vision with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.VisionPrinciplesRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Vision updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async deletePrinciples(id: number) {
        const result = await this.VisionPrinciplesRepository.delete(id);
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
