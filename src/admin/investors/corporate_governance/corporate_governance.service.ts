import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CorporateGovernance } from '../../../entity/corporate_governance.entity';
import { CorporateGovernanceDto } from '../../../dto/corporate_governance.dto';

@Injectable()
export class CorporateGovernanceService {
  constructor(
    @InjectRepository(CorporateGovernance)
    private readonly CorporateGovernanceRepo: Repository<CorporateGovernance>,
  ) {}

    //////////CorporateGovernance pipes/////////////
    // CREATE
    async create(createDto: CorporateGovernanceDto) {
    const share_holding_information = this.CorporateGovernanceRepo.create(createDto);
    const data = await this.CorporateGovernanceRepo.save(share_holding_information);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'CorporateGovernance created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.CorporateGovernanceRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'CorporateGovernance fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.CorporateGovernanceRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`CorporateGovernance with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'CorporateGovernance fetched successfully',
        data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: CorporateGovernanceDto) {
        const entity = await this.CorporateGovernanceRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`CorporateGovernance with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.CorporateGovernanceRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'CorporateGovernance pipes updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.CorporateGovernanceRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`CorporateGovernance with ID ${id} not found`);
        }

        await this.CorporateGovernanceRepo.remove(share_holding_information);

        return {
        statusCode: HttpStatus.OK,
        message: 'CorporateGovernance deleted successfully',
        };
    }
}
