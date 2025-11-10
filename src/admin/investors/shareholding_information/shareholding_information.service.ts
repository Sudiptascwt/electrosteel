import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareHoldingInformation } from '../../../entity/share_holding_information.entity';
import { ShareHoldingInformationDto } from '../../../dto/share_holding_information.dto';

@Injectable()
export class ShareHoldingInformationService {
  constructor(
    @InjectRepository(ShareHoldingInformation)
    private readonly ShareHoldingInformationRepo: Repository<ShareHoldingInformation>,
  ) {}

    //////////ShareHoldingInformation pipes/////////////
    // CREATE
    async create(createDto: ShareHoldingInformationDto) {
        const share_holding_information = this.ShareHoldingInformationRepo.create(createDto);
        const data = await this.ShareHoldingInformationRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'ShareHoldingInformation created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.ShareHoldingInformationRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'ShareHoldingInformation fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.ShareHoldingInformationRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `ShareHoldingInformation with id ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'ShareHoldingInformation fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: ShareHoldingInformationDto) {
        const entity = await this.ShareHoldingInformationRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `ShareHoldingInformation with id ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.ShareHoldingInformationRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'ShareHoldingInformation pipes updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.ShareHoldingInformationRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `ShareHoldingInformation with id ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.ShareHoldingInformationRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'ShareHoldingInformation deleted successfully',
        };
    }
}
