import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PipeArt } from '../../entity/pipe_art.entity';
import { PipeArtDto } from '../../dto/pipe_art.dto';
import { PipeArtDetail } from 'src/entity/pipe_art_details.entity';

@Injectable()
export class PipeArtService {
    constructor(
        @InjectRepository(PipeArt)
        private readonly pipeArtRepository: Repository<PipeArt>,

        @InjectRepository(PipeArtDetail)
        private readonly pipeDetailsRepository: Repository<PipeArtDetail>,
    ) {}

    // ------------------- PIPE ART CRUD -------------------

    // CREATE PIPE ART
    async create(createDto: PipeArtDto) {
        const newPipeArt = this.pipeArtRepository.create(createDto);
        const savedPipeArt = await this.pipeArtRepository.save(newPipeArt);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'PipeArt created successfully',
            data: savedPipeArt,
        };
    }

    // GET ALL PIPE ARTS WITH DETAILS
    async findAll() {
        const data = await this.pipeArtRepository.find({
            relations: ['details'], 
        });

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'PipeArt details fetched successfully' : 'No PipeArt details found',
            data,
        };
    }

    // GET PIPE ART BY ID WITH DETAILS
    async findById(id: number) {
        const pipeArt = await this.pipeArtRepository.findOne({
            where: { id },
            relations: ['details'], 
        });

        if (!pipeArt) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `PipeArt with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'PipeArt fetched successfully',
            data: pipeArt,
        };
    }

    // UPDATE PIPE ART
    async update(id: number, updateDto: PipeArtDto) {
        const pipeArt = await this.pipeArtRepository.findOne({ where: { id } });

        if (!pipeArt) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `PipeArt with ID ${id} not found`,
            });
        }

        Object.assign(pipeArt, updateDto);
        const updatedPipeArt = await this.pipeArtRepository.save(pipeArt);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'PipeArt updated successfully',
            data: updatedPipeArt,
        };
    }

    // DELETE PIPE ART
    async delete(id: number) {
        const result = await this.pipeArtRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `PipeArt with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'PipeArt deleted successfully',
            data: null,
        };
    }

    // ------------------- PIPE DETAILS CRUD -------------------

    // ADD PIPE DETAILS TO A PIPE ART
    async addPipeDetails(detailsDto: Partial<PipeArtDetail>) {
        const newDetails = this.pipeDetailsRepository.create({
            ...detailsDto
        });

        const savedDetails = await this.pipeDetailsRepository.save(newDetails);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'PipeArt details added successfully',
            data: savedDetails,
        };
    }

    // GET PIPE DETAILS BY PIPE ID
    async getPipeDetails(detailId: number) {
        const pipeArtDetails = await this.pipeDetailsRepository.findOne({
            where: { id: detailId },
            // relations: ['details'],
        });
        if (!pipeArtDetails) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `PipeArt details with ID ${detailId} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'PipeArt details fetched successfully',
            data: pipeArtDetails,
        };
    }
    //get all pipes details
    async getAllPipeDetails() {
        const pipeArtDetails = await this.pipeDetailsRepository.findAndCount({});
        if (!pipeArtDetails) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `PipeArt details not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'PipeArt details fetched successfully',
            data: pipeArtDetails,
        };
    }

    // UPDATE PIPE DETAILS
    async updatePipeDetails(detailId: number, updateDto: Partial<PipeArtDetail>) {
        const details = await this.pipeDetailsRepository.findOne({
            where: { id: detailId }, 
        });

        if (!details) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Pipe detail with ID ${detailId} not found`,
            });
        }

        Object.assign(details, updateDto);
        const updatedDetails = await this.pipeDetailsRepository.save(details);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'PipeArt detail updated successfully',
            data: updatedDetails,
        };
    }

    // DELETE PIPE DETAILS
    async deletePipeDetails(detailId: number) {
        const result = await this.pipeDetailsRepository.delete(detailId);

        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Pipe detail with ID ${detailId} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'PipeArt detail deleted successfully'
        };
    }
}
