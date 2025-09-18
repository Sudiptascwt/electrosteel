import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountOfJointVenture } from '../../../../entity/accounts_of_joint_venture.entity';
import { AccountOfJointVentureDto } from '../../../../dto/accounts_of_joint_venture.dto';

@Injectable()
export class AccountOfJointVentureService {
  constructor(
    @InjectRepository(AccountOfJointVenture)
    private readonly AccountOfJointVentureRepo: Repository<AccountOfJointVenture>,
  ) {}

    // CREATE
    async create(createDto: AccountOfJointVentureDto) {
        if (Array.isArray(createDto.title)) {
            createDto.title = createDto.title.join(',');
        }
        if (Array.isArray(createDto.pdf)) {
            createDto.pdf = createDto.pdf.join(',');
        }

        const office = this.AccountOfJointVentureRepo.create(createDto);
        const data = await this.AccountOfJointVentureRepo.save(office);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Annual Report created successfully',
            data,
        };
        }

        // GET ALL
    async findAll() {
        const data = await this.AccountOfJointVentureRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'Annual Report fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.AccountOfJointVentureRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Annual Report with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'Annual Report fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: AccountOfJointVentureDto) {
        if (Array.isArray(updateDto.title)) {
            updateDto.title = updateDto.title.join(',');
        }
        if (Array.isArray(updateDto.pdf)) {
            updateDto.pdf = updateDto.pdf.join(',');
        }

        await this.AccountOfJointVentureRepo.update(id, updateDto);

        const data = await this.AccountOfJointVentureRepo.findOneBy({ id });
        return {
            statusCode: HttpStatus.OK,
            message: 'Annual Report updated successfully',
            data,
        };
    }

    // DELETE
    async delete(id: number) {
        const office = await this.AccountOfJointVentureRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Annual Report with ID ${id} not found`);
        }

        await this.AccountOfJointVentureRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'Annual Report deleted successfully',
        };
    }
}
