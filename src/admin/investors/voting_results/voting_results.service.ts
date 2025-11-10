import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VotingResults } from '../../../entity/voting_results.entity';
import { VotingResultsDto } from '../../../dto/voting_results.dto';

@Injectable()
export class VotingResultsService {
  constructor(
    @InjectRepository(VotingResults)
    private readonly VotingResultsRepo: Repository<VotingResults>,
  ) {}

    //////////VotingResults pipes/////////////
    // CREATE
    async create(createDto: VotingResultsDto) {
        const share_holding_information = this.VotingResultsRepo.create(createDto);
        const data = await this.VotingResultsRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Voting result created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.VotingResultsRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'VotingResults fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.VotingResultsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Voting result with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Voting result fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: VotingResultsDto) {
        const entity = await this.VotingResultsRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `Voting result with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.VotingResultsRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Voting result updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.VotingResultsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Voting result with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.VotingResultsRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Voting result deleted successfully',
        };
    }
}
