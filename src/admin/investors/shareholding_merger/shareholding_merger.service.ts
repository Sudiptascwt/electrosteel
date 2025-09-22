import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareholderMerger } from '../../../entity/shareholding_merger.entity';
import { ShareholderMergerDto } from '../../../dto/shareholding_merger.dto';

@Injectable()
export class ShareholdingMergerService {
  constructor(
    @InjectRepository(ShareholderMerger)
    private readonly ShareholdingMergerRepo: Repository<ShareholderMerger>,
  ) {}

    //////////ShareholdingMerger/////////////
    // CREATE
    async create(createDto: ShareholderMergerDto) {
    const share_holding_information = this.ShareholdingMergerRepo.create(createDto);
    const data = await this.ShareholdingMergerRepo.save(share_holding_information);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'ShareholdingMerger created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.ShareholdingMergerRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'ShareholdingMerger fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.ShareholdingMergerRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`ShareholdingMerger with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'ShareholdingMerger fetched successfully',
        data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: ShareholderMergerDto) {
        const entity = await this.ShareholdingMergerRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`ShareholdingMerger with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.ShareholdingMergerRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'ShareholdingMerger updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.ShareholdingMergerRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`ShareholdingMerger with ID ${id} not found`);
        }

        await this.ShareholdingMergerRepo.remove(share_holding_information);

        return {
        statusCode: HttpStatus.OK,
        message: 'ShareholdingMerger deleted successfully',
        };
    }
}
