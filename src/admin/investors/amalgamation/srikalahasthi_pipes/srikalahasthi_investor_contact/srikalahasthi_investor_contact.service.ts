import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrikalahasthiInvestorContact } from '../../../../../entity/srikalahasthi_investor_contact.entity';
import { SrikalahasthiInvestorContactDto } from '../../../../../dto/srikalahasthi_investor_contact.dto';

@Injectable()
export class SrikalahasthiInvestorContactService {
  constructor(
    @InjectRepository(SrikalahasthiInvestorContact)
    private readonly SrikalahasthiRepo: Repository<SrikalahasthiInvestorContact>,
  ) {}

    //////////srikalahasthi notice/////////////
    // CREATE
    async create(createDto: SrikalahasthiInvestorContactDto) {
        const office = this.SrikalahasthiRepo.create(createDto);
        const data = await this.SrikalahasthiRepo.save(office);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Srikalahasthi investor contact created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.SrikalahasthiRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'All srikalahasthi investor contacts fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Srikalahasthi investor contact with ID ${id} not found`);
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Srikalahasthi investor contact fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiInvestorContactDto) {
        const entity = await this.SrikalahasthiRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`Srikalahasthi investor contact with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.SrikalahasthiRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Srikalahasthi investor contact updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `Srikalahasthi investor contact with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.SrikalahasthiRepo.remove(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Srikalahasthi investor contact deleted successfully',
        };
    }
}
