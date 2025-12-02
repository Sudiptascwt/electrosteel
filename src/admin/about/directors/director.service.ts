import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directors } from '../../../entity/director.entity';
import { DirectorsDto } from '../../../dto/director.dto';
import { AllPagesTitle } from '../../../entity/all_page_title.entity';
import { AllPagesTitleDto } from '../../../dto/all_page_title.dto';

@Injectable()
export class DirectorService {
    constructor(
        @InjectRepository(Directors)
        private readonly DirectorsRepository: Repository<Directors>,

        @InjectRepository(AllPagesTitle)
        private readonly AllPagesTitleRepository: Repository<AllPagesTitle>,
    ) {}

    // CREATE
    async create(infoDto: AllPagesTitleDto, directors: DirectorsDto[]) {
        try {
            infoDto.page_name = 'director';
            let savedInfo: AllPagesTitle;

            const existingInfo = await this.AllPagesTitleRepository.findOne({
            where: { page_name: 'director' },
            });

            if (existingInfo) {
            Object.assign(existingInfo, infoDto);
            savedInfo = await this.AllPagesTitleRepository.save(existingInfo);
            } else {
            const newInfo = this.AllPagesTitleRepository.create(infoDto);
            savedInfo = await this.AllPagesTitleRepository.save(newInfo);
            }
            const savedDirectors = await this.DirectorsRepository.save(directors);
            const savedTitles = await this.AllPagesTitleRepository.save(infoDto);

            return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Directors saved successfully',
            data: {
                name1: savedTitles.name1,
                name2: savedTitles.name2,
                directors: savedDirectors,
            },
            };
        } catch (error) {
            return {
            status: false,
            statusCode: 500,
            message: 'Something went wrong',
            error: error.message,
            };
        }
    }

    // GET ALL
    async findAll() {
    try {
        const directors = await this.DirectorsRepository.find({
        order: { id: 'ASC' },
        });

        const [pageTitle] = await this.AllPagesTitleRepository.find({
        where: { page_name: 'director' },
        order: { id: 'ASC' },
        take: 1,
        });

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: directors.length > 0
                ? 'All directors fetched successfully'
                : 'No directors found',
            data: {
                name1: pageTitle?.name1 ?? null,
                name2: pageTitle?.name2 ?? null,
                data: directors, 
            },
        };
    } catch (error) {
        return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while fetching directors',
        error: error.message,
        };
    }
    }

    // GET BY ID
    async findById(id: number) {
        try {
            const director = await this.DirectorsRepository.findOne({ where: { id } });

            if (!director) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Director with ID ${id} not found`,
            });
            }

            const [pageTitle] = await this.AllPagesTitleRepository.find({
            order: { id: 'ASC' },
            take: 1,
            });

            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'Director fetched successfully',
                data: {
                    name1: pageTitle?.name1 ?? null,
                    name2: pageTitle?.name2 ?? null,
                    data: director,
                },
            };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while fetching director',
                error: error.message,
            };
        }
    }

    // UPDATE
    async update(id: number, body: any) {
    try {
        const { name1, name2, directors } = body;  // 👈 change here

        const director = await this.DirectorsRepository.findOne({ where: { id } });

        if (!director) {
        throw new NotFoundException({
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: `Director with ID ${id} not found`,
        });
        }

        // Page title (AllPagesTitle)
        let [pageTitle] = await this.AllPagesTitleRepository.find({
        order: { id: 'ASC' },
        take: 1,
        });

        if (!pageTitle) {
        pageTitle = this.AllPagesTitleRepository.create({});
        }

        if (name1 !== undefined) pageTitle.name1 = name1;
        if (name2 !== undefined) pageTitle.name2 = name2;

        const updatedPageTitle = await this.AllPagesTitleRepository.save(pageTitle);

        const updateData = Array.isArray(directors) ? directors[0] : directors;

        Object.assign(director, updateData);
        const updatedDirector = await this.DirectorsRepository.save(director);

        return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Director and page title updated successfully',
        data: {
            pageTitle: updatedPageTitle,
            director: updatedDirector,
        },
        };
    } catch (error) {
        return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while updating director',
        error: error.message,
        };
    }
    }

    // DELETE
    async delete(id: number) {
    try {
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
        message: 'Director deleted successfully',
        };
    } catch (error) {
        return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while deleting director',
        error: error.message,
        };
    }
    }
}
