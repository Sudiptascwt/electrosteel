import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmploymentForm } from '../../entity/employment_form.entity';
import { EmploymentFormDto } from '../../dto/employment_form.dto';

@Injectable()
export class EmploymentFormService {
    constructor(
        @InjectRepository(EmploymentForm)
        private readonly EmploymentFormRepo: Repository<EmploymentForm>,
    ) {}

    // CREATE
    async create(createDto: EmploymentFormDto) {
        const newContact = this.EmploymentFormRepo.create(createDto);
        const savedContact = await this.EmploymentFormRepo.save(newContact);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Employment form created successfully',
            data: savedContact,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.EmploymentFormRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Employment form fetched successfully' : 'No Employment form found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const contact = await this.EmploymentFormRepo.findOne({ where: { id } });
        if (!contact) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Employment form with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Employment form fetched successfully',
            data: contact,
        };
    }

    // UPDATE
    async update(id: number, updateDto: EmploymentFormDto) {
        const contact = await this.EmploymentFormRepo.findOne({ where: { id } });
        if (!contact) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Employment form with ID ${id} not found`,
            });
        }

        Object.assign(contact, updateDto);
        const updatedContact = await this.EmploymentFormRepo.save(contact);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Employment form updated successfully',
            data: updatedContact,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.EmploymentFormRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Employment form with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Employment form deleted successfully',
            data: null,
        };
    }
}
