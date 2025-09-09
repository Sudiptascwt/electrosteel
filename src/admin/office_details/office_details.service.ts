import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { officeDetails } from '../../entity/office_section.entity';
import { OfficeDetailsDto } from '../../dto/office_section.dto';

@Injectable()
export class OfficeDetailsService {
    constructor(
        @InjectRepository(officeDetails)
        private readonly officeDetailsRepository: Repository<officeDetails>,
    ) {}

    // CREATE
    async create(createDto: OfficeDetailsDto) {
        const newOffice = this.officeDetailsRepository.create(createDto);
        const savedOffice = await this.officeDetailsRepository.save(newOffice);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Office details created successfully',
            data: savedOffice,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.officeDetailsRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Office details fetched successfully' : 'No office details found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.officeDetailsRepository.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Office details with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Office details fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: OfficeDetailsDto) {
        const office = await this.officeDetailsRepository.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Office details with ID ${id} not found`,
            });
        }

        Object.assign(office, updateDto);
        const updatedOffice = await this.officeDetailsRepository.save(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Office details updated successfully',
            data: updatedOffice,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.officeDetailsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Office details with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Office details deleted successfully',
            data: null,
        };
    }
}
