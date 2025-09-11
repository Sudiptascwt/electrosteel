import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsLetter } from '../../../entity/news_letter.entity';
import { NewsLetterDto } from '../../../dto/news_letter.dto';
@Injectable()
export class NewsLetterService {
    constructor(
        @InjectRepository(NewsLetter)
        private readonly NewsLetterRepository: Repository<NewsLetter>,
    ) {}
    

    // CREATE
    async create(createDto: NewsLetterDto) {
        try {
        const newNewsLetter = this.NewsLetterRepository.create(createDto);
        const savedNewsLetter = await this.NewsLetterRepository.save(newNewsLetter);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'NewsLetter created successfully',
            data: savedNewsLetter,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating NewsLetter',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.NewsLetterRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'NewsLetters fetched successfully' : 'No NewsLetter found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.NewsLetterRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `NewsLetter with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'NewsLetter fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: NewsLetterDto) {
        const About = await this.NewsLetterRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `NewsLetter with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.NewsLetterRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'NewsLetter updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.NewsLetterRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `NewsLetter with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'NewsLetter deleted successfully'
        };
    }
}
