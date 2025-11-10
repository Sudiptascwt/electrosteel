import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestorPresentation } from '../../../entity/investor_presentation.entity';
import { InvestorPresentationDto } from '../../../dto/investor_presentation.dto';

@Injectable()
export class InvestorPresentationService {
  constructor(
    @InjectRepository(InvestorPresentation)
    private readonly InvestorPresentationRepo: Repository<InvestorPresentation>,
  ) {}

    //////////InvestorPresentation/////////////
    // CREATE
    async create(createDto: InvestorPresentationDto) {
        const share_holding_information = this.InvestorPresentationRepo.create(createDto);
        const data = await this.InvestorPresentationRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Investor presentation created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.InvestorPresentationRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor presentation fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.InvestorPresentationRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `InvestorPresentation with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor presentation fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: InvestorPresentationDto) {
        const entity = await this.InvestorPresentationRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `InvestorPresentation with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.InvestorPresentationRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor presentation updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.InvestorPresentationRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `InvestorPresentation with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.InvestorPresentationRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor presentation deleted successfully',
        };
    }
}
