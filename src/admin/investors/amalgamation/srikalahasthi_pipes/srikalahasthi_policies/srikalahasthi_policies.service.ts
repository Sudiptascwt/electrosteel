import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrikalahasthiPolicies } from '../../../../../entity/srikalahasthi_policies.entity';
import { SrikalahasthiPoliciesDto } from '../../../../../dto/srikalahasthi_policies.dto';

@Injectable()
export class SrikalahasthiPoliciesService {
  constructor(
    @InjectRepository(SrikalahasthiPolicies)
    private readonly SrikalahasthiRepo: Repository<SrikalahasthiPolicies>,
  ) {}

    //////////srikalahasthi policy/////////////
    // CREATE
    async create(createDto: SrikalahasthiPoliciesDto) {
    const office = this.SrikalahasthiRepo.create(createDto);
    const data = await this.SrikalahasthiRepo.save(office);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'srikalahasthi policy created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.SrikalahasthiRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All srikalahasthi policy fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`srikalahasthi policy with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'srikalahasthi pipe fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiPoliciesDto) {
        const entity = await this.SrikalahasthiRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`Srikalahasthi with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.SrikalahasthiRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'srikalahasthi policy updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`srikalahasthi policy with ID ${id} not found`);
        }

        await this.SrikalahasthiRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'srikalahasthi policy deleted successfully',
        };
    }
}
