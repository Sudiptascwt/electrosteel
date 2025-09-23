import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditRatings } from '../../../entity/credit_ratings.entity';
import { CreditRatingsDto } from '../../../dto/credit_ratings.dto';

@Injectable()
export class CreditRatingsService {
  constructor(
    @InjectRepository(CreditRatings)
    private readonly CreditRatingsRepo: Repository<CreditRatings>,
  ) {}

    //////////CreditRatings/////////////
    // CREATE
    async create(createDto: CreditRatingsDto) {
        const share_holding_information = this.CreditRatingsRepo.create(createDto);
        const data = await this.CreditRatingsRepo.save(share_holding_information);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Credit ratings created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.CreditRatingsRepo.find();
        return {
            statusCode: HttpStatus.OK,
            message: 'Credit ratings fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.CreditRatingsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException(`CreditRatings with ID ${id} not found`);
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Credit ratings fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: CreditRatingsDto) {
        const entity = await this.CreditRatingsRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`CreditRatings with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.CreditRatingsRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'Credit ratings updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.CreditRatingsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`CreditRatings with ID ${id} not found`);
        }

        await this.CreditRatingsRepo.remove(share_holding_information);

        return {
            statusCode: HttpStatus.OK,
            message: 'Credit ratings deleted successfully',
        };
    }
}
