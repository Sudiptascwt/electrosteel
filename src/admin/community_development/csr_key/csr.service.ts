import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CsrKey } from '../../../entity/csr_key.entity';
import { CsrKeyDto } from '../../../dto/csr_key.dto';
import { CsrOverview } from 'src/entity/csr_overview.entity';
import { CsrOverviewDto } from 'src/dto/csr_overview.dto';

@Injectable()
export class CsrKeyService {
    constructor(
        @InjectRepository(CsrKey)
        private readonly CsrKeyRepository: Repository<CsrKey>,
        @InjectRepository(CsrOverview)
        private readonly CsrOverviewRepository: Repository<CsrOverview>,
    ) {}

    // ------------------- PIPE ART CRUD -------------------

    // CREATE PIPE ART
    async create(createDto: CsrKeyDto) {
        const newCsrKey = this.CsrKeyRepository.create(createDto);
        const savedCsrKey = await this.CsrKeyRepository.save(newCsrKey);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'CsrKey created successfully',
            data: savedCsrKey,
        };
    }

    // GET ALL PIPE ARTS WITH DETAILS
    async findAll() {
        const data = await this.CsrKeyRepository.find({
        });

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'CsrKey details fetched successfully' : 'No CsrKey details found',
            data,
        };
    }

    // GET PIPE ART BY ID WITH DETAILS
    async findById(id: number) {
        const CsrKey = await this.CsrKeyRepository.findOne({
            where: { id }
        });

        if (!CsrKey) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `CsrKey with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'CsrKey fetched successfully',
            data: CsrKey,
        };
    }

    // UPDATE PIPE ART
    async update(id: number, updateDto: CsrKeyDto) {
        const CsrKey = await this.CsrKeyRepository.findOne({ where: { id } });

        if (!CsrKey) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `CsrKey with ID ${id} not found`,
            });
        }

        Object.assign(CsrKey, updateDto);
        const updatedCsrKey = await this.CsrKeyRepository.save(CsrKey);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'CsrKey updated successfully',
            data: updatedCsrKey,
        };
    }

    // DELETE PIPE ART
    async delete(id: number) {
        const result = await this.CsrKeyRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `CsrKey with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'CsrKey deleted successfully'
        };
    }

    ///////////////////csr overview////////////////////
      // CREATE PIPE ART
    async createCsrOverview(createDto: CsrOverviewDto) {
        const newCsrKey = this.CsrOverviewRepository.create(createDto);
        const savedCsrKey = await this.CsrOverviewRepository.save(newCsrKey);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Csr overview created successfully',
            data: savedCsrKey,
        };
    }

    // GET ALL PIPE ARTS WITH DETAILS
    async findAllCsrOverviews() {
        const data = await this.CsrOverviewRepository.find({
        });

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Csr overview details fetched successfully' : 'No Csr overview details found',
            data,
        };
    }

    // GET PIPE ART BY ID WITH DETAILS
    async findCsrOverviewById(id: number) {
        const CsrKey = await this.CsrOverviewRepository.findOne({
            where: { id }
        });

        if (!CsrKey) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Csr overview with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Csr overview fetched successfully',
            data: CsrKey,
        };
    }

    // UPDATE PIPE ART
    async updateCsrOverview(id: number, updateDto: CsrOverviewDto) {
        const CsrKey = await this.CsrOverviewRepository.findOne({ where: { id } });

        if (!CsrKey) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Csr overview with ID ${id} not found`,
            });
        }

        Object.assign(CsrKey, updateDto);
        const updatedCsrKey = await this.CsrOverviewRepository.save(CsrKey);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Csr overview updated successfully',
            data: updatedCsrKey,
        };
    }

    // DELETE PIPE ART
    async deleteCsrOverview(id: number) {
        const result = await this.CsrOverviewRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Csr overview with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Csr overview deleted successfully'
        };
    }
}
