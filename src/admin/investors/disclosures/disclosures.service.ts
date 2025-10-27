import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disclosure } from '../../../entity/disclosure.entity'
import { DisclosureDto } from '../../../dto/disclosure.dto';

@Injectable()
export class DisclosuresService {
  constructor(
    @InjectRepository(Disclosure)
    private readonly DisclosuresRepo: Repository<Disclosure>,
  ) {}

    //////////Disclosures/////////////
    // CREATE
    async create(createDto: DisclosureDto) {
        const disclosure_data = this.DisclosuresRepo.create(createDto);
        const data = await this.DisclosuresRepo.save(disclosure_data);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Disclosure created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.DisclosuresRepo.find();
        return {
            statusCode: HttpStatus.OK,
            message: 'All disclosures fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const disclosure_data = await this.DisclosuresRepo.findOne({ where: { id } });
        if (!disclosure_data) {
            throw new NotFoundException(`Disclosures with ID ${id} not found`);
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Disclosure data fetched successfully',
            data: disclosure_data,
        };
    }

    // UPDATE
    async update(id: number, updateDto: DisclosureDto) {
        const entity = await this.DisclosuresRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`Disclosures with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.DisclosuresRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'Disclosure data updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const disclosure_data = await this.DisclosuresRepo.findOne({ where: { id } });
        if (!disclosure_data) {
        throw new NotFoundException(`Disclosures with ID ${id} not found`);
        }

        await this.DisclosuresRepo.remove(disclosure_data);

        return {
            statusCode: HttpStatus.OK,
            message: 'Disclosure data deleted successfully',
        };
    }
}
