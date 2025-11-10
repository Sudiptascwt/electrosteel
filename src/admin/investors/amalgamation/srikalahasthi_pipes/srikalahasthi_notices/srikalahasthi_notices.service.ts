import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrikalahasthiNotices } from '../../../../../entity/srikalahasthi_notices.entity';
import { SrikalahasthiNoticesDto } from '../../../../../dto/srikalahasthi_notices.dto';

@Injectable()
export class SrikalahasthiNoticesService {
  constructor(
    @InjectRepository(SrikalahasthiNotices)
    private readonly SrikalahasthiRepo: Repository<SrikalahasthiNotices>,
  ) {}

    //////////srikalahasthi notice/////////////
    // CREATE
    async create(createDto: SrikalahasthiNoticesDto) {
        const office = this.SrikalahasthiRepo.create(createDto);
        const data = await this.SrikalahasthiRepo.save(office);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'srikalahasthi notice created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.SrikalahasthiRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'All srikalahasthi notice fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `srikalahasthi notice with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'srikalahasthi pipe fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiNoticesDto) {
        const entity = await this.SrikalahasthiRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `srikalahasthi notice with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.SrikalahasthiRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'srikalahasthi notice updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `srikalahasthi notice with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.SrikalahasthiRepo.remove(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'srikalahasthi notice deleted successfully',
        };
    }
}
