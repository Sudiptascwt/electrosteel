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

    // ------------------- CSR CRUD -------------------

    // CREATE CSR
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

    // GET ALL CSRS WITH DETAILS
    async findAll() {
        const data = await this.CsrKeyRepository.find();

        if (!data || data.length === 0) {
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'No CsrKey details found',
                data: [],
            };
        }
        const grouped = Object.values(
            data.reduce((acc, item) => {
                if (!acc[item.id]) {
                    acc[item.id] = {
                        id: item.id,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
                    };
                }
                acc[item.id][item.page_meta_key] = item.page_meta_value;
                return acc;
            }, {})
        );

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'CsrKey details fetched successfully',
            data: grouped,
        };
    }

    // GET CSR BY ID WITH DETAILS
    async findById(id: number) {
        const records = await this.CsrKeyRepository.find({ where: { id } });

        if (!records || records.length === 0) {
            throw new NotFoundException({
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: `CsrKey with ID ${id} not found`,
            });
        }

        const grouped = Object.values(
            records.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = {
                id: item.id,
                created_at: item.created_at,
                updated_at: item.updated_at,
                };
            }
            acc[item.id][item.page_meta_key] = item.page_meta_value;
            return acc;
            }, {})
        );

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'CsrKey fetched successfully',
            data: grouped, 
        };
    }


    // UPDATE CSR
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

    // async updateCsrOverviewByMetaKey(updateDto: CsrKeyDto) {
    // const { page_meta_key, page_meta_value } = updateDto;


    // const existingRecord = await this.CsrKeyRepository.findOne({
    //     where: { page_meta_key },
    // });

    // if (!existingRecord) {
    //     throw new NotFoundException({
    //     status: false,
    //     statusCode: HttpStatus.NOT_FOUND,
    //     message: `CSR overview with meta key '${page_meta_key}' not found`,
    //     });
    // }

    // existingRecord.page_meta_value = page_meta_value;

    // const updatedRecord = await this.CsrOverviewRepository.save(existingRecord);

    // return {
    //     status: true,
    //     statusCode: HttpStatus.OK,
    //     message: `CSR overview updated successfully for meta key '${page_meta_key}'`,
    //     data: updatedRecord,
    // };
    // }

    // DELETE CSR
    
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
      // CREATE CSR
    async createCsrOverview(createDto: CsrOverviewDto) {
        const newCsrOverview = this.CsrOverviewRepository.create(createDto);
        const savedCsrOverview = await this.CsrOverviewRepository.save(newCsrOverview);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Csr overview created successfully',
            data: savedCsrOverview,
        };
    }

    // GET ALL CSRS WITH DETAILS
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

    // GET CSR Overview BY ID WITH DETAILS
    async findCsrOverviewById(id: number) {
        const CsrOverview = await this.CsrOverviewRepository.findOne({
            where: { id }
        });

        if (!CsrOverview) {
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

    // UPDATE CSR
    async updateCsrOverview(id: number, updateDto: CsrOverviewDto) {
        const CsrOverview = await this.CsrOverviewRepository.findOne({ where: { id } });

        if (!CsrOverview) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Csr overview with ID ${id} not found`,
            });
        }

        Object.assign(CsrOverview, updateDto);
        const updatedCsrKey = await this.CsrOverviewRepository.save(CsrOverview);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Csr overview updated successfully',
            data: updatedCsrKey,
        };
    }
    

    // DELETE CSR
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
