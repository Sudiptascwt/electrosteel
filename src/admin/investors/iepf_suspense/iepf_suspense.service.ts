import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IepfSuspense } from '../../../entity/iepf_suspense.entity';
import { IepfSuspenseDto } from '../../../dto/iepf_suspense.dto';

@Injectable()
export class IepfSuspenseService {
  constructor(
    @InjectRepository(IepfSuspense)
    private readonly IepfSuspenseRepo: Repository<IepfSuspense>,
  ) {}

    //////////IepfSuspense pipes/////////////
    // CREATE
    async create(createDto: IepfSuspenseDto) {
        const share_holding_information = this.IepfSuspenseRepo.create(createDto);
        const data = await this.IepfSuspenseRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Iepf suspense details created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.IepfSuspenseRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'All Iepf suspense details fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.IepfSuspenseRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `IepfSuspense details with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Iepf suspense details fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: IepfSuspenseDto) {
        const entity = await this.IepfSuspenseRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`Notice with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.IepfSuspenseRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Iepf suspense details updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.IepfSuspenseRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `IepfSuspense details with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.IepfSuspenseRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'IepfSuspense details deleted successfully',
        };
    }
}
