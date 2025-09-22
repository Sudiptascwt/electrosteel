import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notices160 } from '../../../entity/160_notice.entity';
import { Notices160Dto } from '../../../dto/160_notice.dto';

@Injectable()
export class Notices160Service {
  constructor(
    @InjectRepository(Notices160)
    private readonly Notices160Repo: Repository<Notices160>,
  ) {}

    //////////Notices160 pipes/////////////
    // CREATE
    async create(createDto: Notices160Dto) {
    const share_holding_information = this.Notices160Repo.create(createDto);
    const data = await this.Notices160Repo.save(share_holding_information);

    return {
        statusCode: HttpStatus.CREATED,
        message: '160 Notice created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.Notices160Repo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All 160 Notices fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.Notices160Repo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`Notices160 with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: '160 Notice fetched successfully',
        data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: Notices160Dto) {
        const entity = await this.Notices160Repo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`Notice with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.Notices160Repo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: '160 Notice updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.Notices160Repo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`Notices160 with ID ${id} not found`);
        }

        await this.Notices160Repo.remove(share_holding_information);

        return {
        statusCode: HttpStatus.OK,
        message: '160 Notice deleted successfully',
        };
    }
}
