import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnualReturn } from '../../../entity/annual_return.entity';
import { AnnualReturnDto } from '../../../dto/annual_return.dto';

@Injectable()
export class AnnualReturnService {
  constructor(
    @InjectRepository(AnnualReturn)
    private readonly AnnualReturnRepo: Repository<AnnualReturn>,
  ) {}

    //////////AnnualReturn pipes/////////////
    // CREATE
    async create(createDto: AnnualReturnDto) {
    const share_holding_information = this.AnnualReturnRepo.create(createDto);
    const data = await this.AnnualReturnRepo.save(share_holding_information);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'AnnualReturn created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.AnnualReturnRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'AnnualReturn fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.AnnualReturnRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`AnnualReturn with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'AnnualReturn fetched successfully',
        data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: AnnualReturnDto) {
        const entity = await this.AnnualReturnRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`AnnualReturn with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.AnnualReturnRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'AnnualReturn pipes updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.AnnualReturnRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`AnnualReturn with ID ${id} not found`);
        }

        await this.AnnualReturnRepo.remove(share_holding_information);

        return {
        statusCode: HttpStatus.OK,
        message: 'AnnualReturn deleted successfully',
        };
    }
}
