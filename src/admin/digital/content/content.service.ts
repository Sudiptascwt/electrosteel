import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../../../entity/content.entity';
import { ContentDto } from '../../../dto/Content.dto';
@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private readonly ContentRepository: Repository<Content>,
    ) {}
    

    // CREATE
    async create(createDto: ContentDto) {
        try {
        const newContent = this.ContentRepository.create(createDto);
        const savedContent = await this.ContentRepository.save(newContent);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Content created successfully',
            data: savedContent,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Content',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.ContentRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Contents fetched successfully' : 'No Content found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.ContentRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Content with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Content fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: ContentDto) {
        const About = await this.ContentRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Content with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.ContentRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Content updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.ContentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Content with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Content deleted successfully'
        };
    }
}
