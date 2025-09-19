import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrikalahasthiCodeOfConductInsiders } from '../../../../../entity/srikalahasthi_code_of_conduct_insiders.entity';
import { SrikalahasthiCodeOfConductInsidersDto } from '../../../../../dto/srikalahasthi_code_of_conduct_insiders.dto';

@Injectable()
export class SrikalahasthiCodeOfConductInsidersService {
  constructor(
    @InjectRepository(SrikalahasthiCodeOfConductInsiders)
    private readonly SrikalahasthiCodeOfConductInsidersRepo: Repository<SrikalahasthiCodeOfConductInsiders>,
  ) {}

    //////////Srikalahasthi code of conduct/////////////
    // CREATE
    async create(createDto: SrikalahasthiCodeOfConductInsidersDto) {
        const office = this.SrikalahasthiCodeOfConductInsidersRepo.create(createDto);
        const data = await this.SrikalahasthiCodeOfConductInsidersRepo.save(office);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Srikalahasthi code of conduct created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.SrikalahasthiCodeOfConductInsidersRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All Srikalahasthi code of conduct fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SrikalahasthiCodeOfConductInsidersRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Srikalahasthi code of conduct with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'SrikalahasthiCodeOfConductInsiders pipe fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiCodeOfConductInsidersDto) {
        const entity = await this.SrikalahasthiCodeOfConductInsidersRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`SrikalahasthiCodeOfConductInsiders with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.SrikalahasthiCodeOfConductInsidersRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'Srikalahasthi code of conduct updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.SrikalahasthiCodeOfConductInsidersRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Srikalahasthi code of conduct with ID ${id} not found`);
        }

        await this.SrikalahasthiCodeOfConductInsidersRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'Srikalahasthi code of conduct deleted successfully',
        };
    }
}
