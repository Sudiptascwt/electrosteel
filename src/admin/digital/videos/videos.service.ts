import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DigitalVideos } from '../../../entity/digital_videos.entity';
import { DigitalVideosDto } from '../../../dto/digital_videos.dto';

@Injectable()
export class DigitalVideosService {
    constructor(
        @InjectRepository(DigitalVideos)
        private readonly DigitalVideosRepository: Repository<DigitalVideos>
    ) {}

    // CREATE
    async create(dto: DigitalVideosDto) {
        const DigitalVideoData = this.DigitalVideosRepository.create(dto);
        const data = await this.DigitalVideosRepository.save(DigitalVideoData);
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Video created successfully.',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.DigitalVideosRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Videos fetched successfully' : 'Videos not found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const DigitalVideos = await this.DigitalVideosRepository.findOne({ where: { id } });
        
        if (!DigitalVideos) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Video with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Video fetched successfully',
            data: DigitalVideos,
        };
    }
    async update(id: number, updateDto: DigitalVideosDto) {
        const DigitalVideos = await this.DigitalVideosRepository.findOne({ where: { id } });

        if (!DigitalVideos) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Video with ID ${id} not found`,
            });
        }
        Object.assign(DigitalVideos, updateDto, {
            modified_at: new Date(),
        });
        const updatedDigitalVideos = await this.DigitalVideosRepository.save(DigitalVideos);
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Video updated successfully.',
            data: updatedDigitalVideos,
        };
    }


    // DELETE
    async delete(id: number) {
        const result = await this.DigitalVideosRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Video with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Video deleted successfully'
        };
    }
}
