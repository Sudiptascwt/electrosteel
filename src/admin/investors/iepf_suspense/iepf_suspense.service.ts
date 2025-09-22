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
        statusCode: HttpStatus.CREATED,
        message: '160 Notice created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.IepfSuspenseRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All 160 Notices fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.IepfSuspenseRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`IepfSuspense with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: '160 Notice fetched successfully',
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
            statusCode: HttpStatus.OK,
            message: '160 Notice updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.IepfSuspenseRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`IepfSuspense with ID ${id} not found`);
        }

        await this.IepfSuspenseRepo.remove(share_holding_information);

        return {
        statusCode: HttpStatus.OK,
        message: '160 Notice deleted successfully',
        };
    }
}
