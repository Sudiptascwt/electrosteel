import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { srikalahasthiCodeOfConduct } from '../../../../../entity/srikalahasthi_code_of_conduct.entity';
import { SrikalahasthiCodeOfConductDto } from '../../../../../dto/srikalahasthi_code_of_conduct.dto';

@Injectable()
export class srikalahasthiCodeOfConductService {
  constructor(
    @InjectRepository(srikalahasthiCodeOfConduct)
    private readonly srikalahasthiCodeOfConductRepo: Repository<srikalahasthiCodeOfConduct>,
  ) {}

    //////////Srikalahasthi code of conduct/////////////
    // CREATE
    async create(createDto: SrikalahasthiCodeOfConductDto) {
        const office = this.srikalahasthiCodeOfConductRepo.create(createDto);
        const data = await this.srikalahasthiCodeOfConductRepo.save(office);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Srikalahasthi code of conduct created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.srikalahasthiCodeOfConductRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All Srikalahasthi code of conduct fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.srikalahasthiCodeOfConductRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Srikalahasthi code of conduct with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'srikalahasthiCodeOfConduct pipe fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiCodeOfConductDto) {
        const entity = await this.srikalahasthiCodeOfConductRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`srikalahasthiCodeOfConduct with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.srikalahasthiCodeOfConductRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'Srikalahasthi code of conduct updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.srikalahasthiCodeOfConductRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Srikalahasthi code of conduct with ID ${id} not found`);
        }

        await this.srikalahasthiCodeOfConductRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'Srikalahasthi code of conduct deleted successfully',
        };
    }
}
