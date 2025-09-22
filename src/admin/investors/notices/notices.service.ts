import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notices } from '../../../entity/notices.entity';
import { NoticesDto } from '../../../dto/notices.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notices)
    private readonly NoticesRepo: Repository<Notices>,
  ) {}

    //////////Notices pipes/////////////
    // CREATE
    async create(createDto: NoticesDto) {
    const share_holding_information = this.NoticesRepo.create(createDto);
    const data = await this.NoticesRepo.save(share_holding_information);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'Notice created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.NoticesRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'Notices fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.NoticesRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`Notices with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'Notice fetched successfully',
        data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: NoticesDto) {
        const entity = await this.NoticesRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`Notice with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.NoticesRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'Notice updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.NoticesRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`Notices with ID ${id} not found`);
        }

        await this.NoticesRepo.remove(share_holding_information);

        return {
        statusCode: HttpStatus.OK,
        message: 'Notice deleted successfully',
        };
    }
}
