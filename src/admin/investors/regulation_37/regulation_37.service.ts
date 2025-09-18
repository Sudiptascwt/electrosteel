import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regulation } from '../../../entity/regulation.entity';
import { RegulationsDto } from '../../../dto/regulation.dto';

@Injectable()
export class RegulationService {
  constructor(
    @InjectRepository(Regulation)
    private readonly RegulationRepo: Repository<Regulation>,
  ) {}

    // CREATE
    async create(createDto: RegulationsDto) {
    if (Array.isArray(createDto.title)) {
        createDto.title = createDto.title.join(',');
    }
    if (Array.isArray(createDto.pdf)) {
        createDto.pdf = createDto.pdf.join(',');
    }

    const office = this.RegulationRepo.create(createDto);
    const data = await this.RegulationRepo.save(office);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'Quality result created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
    const data = await this.RegulationRepo.find();
    return {
    statusCode: HttpStatus.OK,
    message: 'Quality result fetched successfully',
    data,
    };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.RegulationRepo.findOne({ where: { id } });
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
    async update(id: number, updateDto: RegulationsDto) {
        if (Array.isArray(updateDto.title)) {
            updateDto.title = updateDto.title.join(',');
        }
        if (Array.isArray(updateDto.pdf)) {
            updateDto.pdf = updateDto.pdf.join(',');
        }

        await this.RegulationRepo.update(id, updateDto);

        const data = await this.RegulationRepo.findOneBy({ id });
        return {
            statusCode: HttpStatus.OK,
            message: 'Quality result updated successfully',
            data,
        };
    }

    // DELETE
    async delete(id: number) {
        const office = await this.RegulationRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Quality result with ID ${id} not found`);
        }

        await this.RegulationRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'Quality result deleted successfully',
        };
    }
}
