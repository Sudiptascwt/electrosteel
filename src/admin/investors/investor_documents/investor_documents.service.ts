import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestorDocuments } from '../../../entity/investor_documents.entity';
import { InvestorDocumentsDto } from '../../../dto/investor_documents.dto';

@Injectable()
export class InvestorDocumentsService {
  constructor(
    @InjectRepository(InvestorDocuments)
    private readonly InvestorDocumentsRepo: Repository<InvestorDocuments>,
  ) {}

    //////////InvestorDocuments/////////////
    // CREATE
    async create(createDto: InvestorDocumentsDto) {
        const share_holding_information = this.InvestorDocumentsRepo.create(createDto);
        const data = await this.InvestorDocumentsRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Investor document created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.InvestorDocumentsRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor documents fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.InvestorDocumentsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `InvestorDocuments with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor document fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: InvestorDocumentsDto) {
        const entity = await this.InvestorDocumentsRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `Investor documents with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.InvestorDocumentsRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor document updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.InvestorDocumentsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Investor document with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.InvestorDocumentsRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor document deleted successfully',
        };
    }
}
