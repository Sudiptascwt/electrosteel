import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrikalahasthiDirectorsResignation } from '../../../../../entity/srikalahasthi_directors_resignation.entity';
import { SrikalahasthiDirectorsResignationDto } from '../../../../../dto/srikalahasthi_directors_resignation.dto';

@Injectable()
export class SrikalahasthiDirectorsResignationService {
  constructor(
    @InjectRepository(SrikalahasthiDirectorsResignation)
    private readonly SrikalahasthiDirectorsResignationRepo: Repository<SrikalahasthiDirectorsResignation>,
  ) {}

    //////////SrikalahasthiDirectorsResignation/////////////
    // CREATE
    async create(createDto: SrikalahasthiDirectorsResignationDto) {
        const office = this.SrikalahasthiDirectorsResignationRepo.create(createDto);
        const data = await this.SrikalahasthiDirectorsResignationRepo.save(office);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'SrikalahasthiDirectorsResignation created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.SrikalahasthiDirectorsResignationRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'All SrikalahasthiDirectorsResignation fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SrikalahasthiDirectorsResignationRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `SrikalahasthiDirectorsResignation with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'SrikalahasthiDirectorsResignation pipe fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiDirectorsResignationDto) {
        const entity = await this.SrikalahasthiDirectorsResignationRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `SrikalahasthiDirectorsResignation with id ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.SrikalahasthiDirectorsResignationRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'SrikalahasthiDirectorsResignation updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.SrikalahasthiDirectorsResignationRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `SrikalahasthiDirectorsResignation with id ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.SrikalahasthiDirectorsResignationRepo.remove(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'SrikalahasthiDirectorsResignation deleted successfully',
        };
    }
}
