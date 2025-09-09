import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBrochures } from '../../entity/product_brochures.entity';
import { ProductBrochuresDto } from '../../dto/product_brochures.dto';

@Injectable()
export class ProductBrochuresService {
    constructor(
        @InjectRepository(ProductBrochures)
        private readonly officeDetailsRepository: Repository<ProductBrochures>,
    ) {}

    // CREATE
    async create(createDto: ProductBrochuresDto) {
        const newOffice = this.officeDetailsRepository.create(createDto);
        const savedOffice = await this.officeDetailsRepository.save(newOffice);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Product Brochure created successfully',
            data: savedOffice,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.officeDetailsRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Product Brochure fetched successfully' : 'No Product Brochure found',
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
                message: `Product Brochure with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Product Brochure fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: ProductBrochuresDto) {
        const office = await this.officeDetailsRepository.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Product Brochure with ID ${id} not found`,
            });
        }

        Object.assign(office, updateDto);
        const updatedOffice = await this.officeDetailsRepository.save(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Product Brochure updated successfully',
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
                message: `Product Brochure with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Product Brochure deleted successfully',
            data: null,
        };
    }
}
