import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrikalahasthiComittee } from '../../../../../entity/srikalahasthi_comittee.entity';
import { SrikalahasthiComitteeDto } from '../../../../../dto/srikalahasthi_comittee.dto';

@Injectable()
export class SrikalahasthiCommiteeService {
  constructor(
    @InjectRepository(SrikalahasthiComittee)
    private readonly SrikalahasthiCommiteeRepo: Repository<SrikalahasthiComittee>,
  ) {}

    //////////SrikalahasthiCommitee pipes/////////////
    // CREATE
    async create(createDto: SrikalahasthiComitteeDto) {
    const office = this.SrikalahasthiCommiteeRepo.create(createDto);
    const data = await this.SrikalahasthiCommiteeRepo.save(office);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'SrikalahasthiCommitee pipes created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.SrikalahasthiCommiteeRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All SrikalahasthiCommitee pipes fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SrikalahasthiCommiteeRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`SrikalahasthiCommitee pipes with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'SrikalahasthiCommitee pipe fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiComitteeDto) {
        const entity = await this.SrikalahasthiCommiteeRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`SrikalahasthiCommitee with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.SrikalahasthiCommiteeRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'SrikalahasthiCommitee pipes updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.SrikalahasthiCommiteeRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`SrikalahasthiCommitee pipes with ID ${id} not found`);
        }

        await this.SrikalahasthiCommiteeRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'SrikalahasthiCommitee pipes deleted successfully',
        };
    }
}
