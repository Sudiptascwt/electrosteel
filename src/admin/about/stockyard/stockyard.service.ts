import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockYard } from '../../../entity/stockYard.entity';
import { StockYardDto } from '../../../dto/stockYard.dto';
import { BoardCommitteDetails } from 'src/entity/board_committe_details.entity';
import { BoardCommitteDetailsDto } from 'src/dto/board_committe_details.dto';

@Injectable()
export class StockYardService {
    constructor(
        @InjectRepository(StockYard)
        private readonly StockYardRepository: Repository<StockYard>,

        @InjectRepository(BoardCommitteDetails) 
        private readonly BoardCommitteDetailsRepository: Repository<BoardCommitteDetails>,
    ) {}
    

    // CREATE
    async create(createDto: StockYardDto) {
        try {
        const newStockYard = this.StockYardRepository.create(createDto);
        const savedStockYard = await this.StockYardRepository.save(newStockYard);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Board committee created successfully',
            data: savedStockYard,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating StockYard',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.StockYardRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'StockYard fetched successfully' : 'No StockYard found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.StockYardRepository.findOne({ where: { id } });
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
    async update(id: number, updateDto: StockYardDto) {
        const About = await this.StockYardRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Board committee with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.StockYardRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Board committee updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.StockYardRepository.delete(id);
        if (result.affected === 0) {
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
