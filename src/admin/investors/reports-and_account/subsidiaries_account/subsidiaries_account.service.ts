import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubsidiariesAccount } from '../../../../entity/accounts_of_subsidiaries.entity';
import { SubsidiariesAccountDto } from '../../../../dto/accounts_of_subsidiaries.dto';

@Injectable()
export class SubsidiariesAccountService {
  constructor(
    @InjectRepository(SubsidiariesAccount)
    private readonly SubsidiariesAccountRepo: Repository<SubsidiariesAccount>,
  ) {}

    // CREATE
    async create(createDto: SubsidiariesAccountDto) {
    if (Array.isArray(createDto.title)) {
        createDto.title = createDto.title.join(',');
    }
    if (Array.isArray(createDto.pdf)) {
        createDto.pdf = createDto.pdf.join(',');
    }

    const office = this.SubsidiariesAccountRepo.create(createDto);
    const data = await this.SubsidiariesAccountRepo.save(office);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'Quality result created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
    const data = await this.SubsidiariesAccountRepo.find();
    return {
    statusCode: HttpStatus.OK,
    message: 'Quality result fetched successfully',
    data,
    };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SubsidiariesAccountRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Quality result with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'Quality result fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SubsidiariesAccountDto) {
        if (Array.isArray(updateDto.title)) {
            updateDto.title = updateDto.title.join(',');
        }
        if (Array.isArray(updateDto.pdf)) {
            updateDto.pdf = updateDto.pdf.join(',');
        }

        await this.SubsidiariesAccountRepo.update(id, updateDto);

        const data = await this.SubsidiariesAccountRepo.findOneBy({ id });
        return {
            statusCode: HttpStatus.OK,
            message: 'Quality result updated successfully',
            data,
        };
    }

    // DELETE
    async delete(id: number) {
        const office = await this.SubsidiariesAccountRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Quality result with ID ${id} not found`);
        }

        await this.SubsidiariesAccountRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'Quality result deleted successfully',
        };
    }
}
