import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srikalahasthi } from '../../../../entity/Srikalahasthi.entity';
import { SrikalahasthiDto } from '../../../../dto/Srikalahasthi.dto';

@Injectable()
export class SrikalahasthiService {
  constructor(
    @InjectRepository(Srikalahasthi)
    private readonly SrikalahasthiRepo: Repository<Srikalahasthi>,
  ) {}

    //////////srikalahasthi pipes/////////////
    // CREATE
    async create(createDto: SrikalahasthiDto) {
    const office = this.SrikalahasthiRepo.create(createDto);
    const data = await this.SrikalahasthiRepo.save(office);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'srikalahasthi pipes created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.SrikalahasthiRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'srikalahasthi pipes fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`srikalahasthi pipes with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'srikalahasthi pipes fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiDto) {
        const entity = await this.SrikalahasthiRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`Srikalahasthi with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.SrikalahasthiRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'srikalahasthi pipes updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`srikalahasthi pipes with ID ${id} not found`);
        }

        await this.SrikalahasthiRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'srikalahasthi pipes deleted successfully',
        };
    }
}
