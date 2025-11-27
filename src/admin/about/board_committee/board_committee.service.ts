import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardCommitteType } from '../../../entity/board_committee_type.entity';
import { BoardCommitteTypeDto } from '../../../dto/board_committee_type.dto';
import { BoardCommitteDetails } from 'src/entity/board_committe_details.entity';
import { BoardCommitteDetailsDto } from 'src/dto/board_committe_details.dto';
import { BoardCommitteTitleDto } from 'src/dto/board_committe_title.dto';
import { BoardCommitteTitle } from 'src/entity/board_committe_title.entity';

@Injectable()
export class BoardCommitteTypeService {
    constructor(
        @InjectRepository(BoardCommitteType)
        private readonly BoardCommitteTypeRepository: Repository<BoardCommitteType>,

        @InjectRepository(BoardCommitteDetails) 
        private readonly BoardCommitteDetailsRepository: Repository<BoardCommitteDetails>,

        @InjectRepository(BoardCommitteTitle) 
        private readonly BoardCommitteTitleRepository: Repository<BoardCommitteTitle>,
    ) {}

    //////// board committe MainTitle ////////
    // CREATE MainTitle
    async createMainTitles(createDto: BoardCommitteTitleDto) {
        try {
        const newBoardCommitteType = this.BoardCommitteTitleRepository.create(createDto);
        const savedBoardCommitteType = await this.BoardCommitteTitleRepository.save(newBoardCommitteType);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Board committee titles created successfully',
            data: savedBoardCommitteType,
        };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while creating BoardCommitteType',
                error: error.message,
            };
        }
    }
    // GET ALL MainTitle
    async findAllMainTitles() {
        const data = await this.BoardCommitteTitleRepository.find({ where: { status: 1 },order: { id: 'ASC' }});
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'BoardCommitteType fetched successfully' : 'No BoardCommitteType found',
            data,
        };
    }
    // UPDATE MainTitle
    async updateMainTitles(id: number, updateDto: BoardCommitteTitleDto) {
        const About = await this.BoardCommitteTitleRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Board committee type with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.BoardCommitteTitleRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Board committee type updated successfully',
            data: updatedAbout,
        };
    }

    //////// board committe type ////////
    // CREATE
    async create(createDto: BoardCommitteTypeDto) {
        try {
        const newBoardCommitteType = this.BoardCommitteTypeRepository.create(createDto);
        const savedBoardCommitteType = await this.BoardCommitteTypeRepository.save(newBoardCommitteType);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Board committee type created successfully',
            data: savedBoardCommitteType,
        };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while creating BoardCommitteType',
                error: error.message,
            };
        }
    }

    // GET ALL
    async findAll() {
        const data = await this.BoardCommitteTypeRepository.find({ where: { status: 1 },order: { id: 'ASC' },  });
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'BoardCommitteType fetched successfully' : 'No BoardCommitteType found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.BoardCommitteTypeRepository.findOne({ where: { id, status: 1 } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Board committee type with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Board committee type fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: BoardCommitteTypeDto) {
        const About = await this.BoardCommitteTypeRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Board committee type with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.BoardCommitteTypeRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Board committee type updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.BoardCommitteTypeRepository.update(
            { id },      
            { status: 0 }
        );

        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Board committee type with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Board committee type deleted successfully'
        };
    }

    //////////board committe details////////
    // CREATE
    async createBoardCommitteDetails(createDto: BoardCommitteDetailsDto) {
        try {
        const newBoardCommitteType = this.BoardCommitteDetailsRepository.create(createDto);
        const savedBoardCommitteType = await this.BoardCommitteDetailsRepository.save(newBoardCommitteType);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Board committee created successfully',
            data: savedBoardCommitteType,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating BoardCommitteType',
            error: error.message,
        };
        }
    }

    // GET ALL
    async findAllBoardCommitteDetails() {
        const data = await this.BoardCommitteDetailsRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'BoardCommitteType fetched successfully' : 'No BoardCommitteType found',
            data,
        };
    }

    // GET BY ID
    async findBoardCommitteDetailsById(id: number) {
        const About = await this.BoardCommitteDetailsRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Board committee with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Board committee fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async updateBoardCommitteDetails(id: number, updateDto: BoardCommitteDetailsDto) {
        const About = await this.BoardCommitteDetailsRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Board committee with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.BoardCommitteDetailsRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Board committee updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async deleteBoardCommitteDetails(id: number) {
        const result = await this.BoardCommitteDetailsRepository.delete(id);

        if (result.affected == 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Board committee with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Board committee deleted successfully'
        };
    }
}
