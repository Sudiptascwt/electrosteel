import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CsrKey } from '../../../entity/csr_key.entity';
import { CsrKeyDto } from '../../../dto/csr_key.dto';

@Injectable()
export class CsrKeyService {
    constructor(
        @InjectRepository(CsrKey)
        private readonly CsrKeyRepository: Repository<CsrKey>,
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
}
