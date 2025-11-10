import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestorRelation } from '../../../entity/investor_relation.entity';
import { InvestorRelationDto } from '../../../dto/investor_relation.dto';
import { AuthorisedKmp } from 'src/entity/authorised_kmp.entity';
import { AuthorisedKmpDto } from 'src/dto/authorised_kmp.dto';
import { InvestorStockInfo } from 'src/entity/investor_stock_info.entity';
import { InvestorStockInfoDto } from 'src/dto/investor_stock_info.dto';

@Injectable()
export class InvestorRelationService {
  constructor(
    @InjectRepository(InvestorRelation)
    private readonly InvestorRelationRepo: Repository<InvestorRelation>,
    @InjectRepository(AuthorisedKmp)
    private readonly AuthorisedKmpRepo: Repository<AuthorisedKmp>,
    @InjectRepository(InvestorStockInfo)
    private readonly InvestorStockInfoRepo: Repository<InvestorStockInfo>,
  ) {}

    //////////InvestorRelation/////////////
    // CREATE
    async create(createDto: InvestorRelationDto) {
        const share_holding_information = this.InvestorRelationRepo.create(createDto);
        const data = await this.InvestorRelationRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Investor relation created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.InvestorRelationRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor relation fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.InvestorRelationRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `InvestorRelation with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor relation fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: InvestorRelationDto) {
        const entity = await this.InvestorRelationRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `InvestorRelation with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.InvestorRelationRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor relation updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.InvestorRelationRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `InvestorRelation with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.InvestorRelationRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor relation deleted successfully',
        };
    }
    //////////////////////////////////authorised_kmp///////////////////////
    async createAuthorisedKmp(createDto: AuthorisedKmpDto) {
        const share_holding_information = this.AuthorisedKmpRepo.create(createDto);
        const data = await this.AuthorisedKmpRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Authorised kmp created successfully',
            data,
        };
    }

    // GET ALL
    async findAllAuthorisedKmps() {
        const data = await this.AuthorisedKmpRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Authorised kmp fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findAuthorisedKmpById(id: number) {
        const share_holding_information = await this.AuthorisedKmpRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Authorised kmp with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Authorised kmp fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async updateAuthorisedKmp(id: number, updateDto: AuthorisedKmpDto) {
        const entity = await this.AuthorisedKmpRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `Authorised kmp with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.AuthorisedKmpRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Authorised kmp updated successfully',
            data: updatedEntity,
        };
    }

    // DELETE
    async deleteAuthorisedKmp(id: number) {
        const share_holding_information = await this.AuthorisedKmpRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Authorised kmp with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.AuthorisedKmpRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Authorised kmp deleted successfully',
        };
    }
    //////////////////////////////////InvestorStockInfo///////////////////////
    async createInvestorStockInfo(createDto: InvestorStockInfoDto) {
        const share_holding_information = this.InvestorStockInfoRepo.create(createDto);
        const data = await this.InvestorStockInfoRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Investor stock info created successfully',
            data,
        };
    }

    // GET ALL
    async findAllInvestorStockInfos() {
        const data = await this.InvestorStockInfoRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor stock info fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findInvestorStockInfoById(id: number) {
        const share_holding_information = await this.InvestorStockInfoRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Investor stock info with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor stock info fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async updateInvestorStockInfo(id: number, updateDto: InvestorStockInfoDto) {
        const entity = await this.InvestorStockInfoRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `Investor stock info with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.InvestorStockInfoRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor stock info updated successfully',
            data: updatedEntity,
        };
    }

    // DELETE
    async deleteInvestorStockInfo(id: number) {
        const share_holding_information = await this.InvestorStockInfoRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Investor stock info with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.InvestorStockInfoRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Investor stock info deleted successfully',
        };
    }
}
