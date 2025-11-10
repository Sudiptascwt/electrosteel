import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CsrProjects } from '../../../entity/csr_projects.entity';
import { CsrProjectsDto } from '../../../dto/csr_projects.dto';

@Injectable()
export class CsrProjectsService {
  constructor(
    @InjectRepository(CsrProjects)
    private readonly CsrProjectsRepo: Repository<CsrProjects>,
  ) {}

    //////////CsrProjects/////////////
    // CREATE
    async create(createDto: CsrProjectsDto) {
        const share_holding_information = this.CsrProjectsRepo.create(createDto);
        const data = await this.CsrProjectsRepo.save(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Annual return created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.CsrProjectsRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Annual return fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.CsrProjectsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `CsrProjects with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Annual return fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: CsrProjectsDto) {
        const entity = await this.CsrProjectsRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `CsrProjects with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.CsrProjectsRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Annual return updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.CsrProjectsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `CsrProjects with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.CsrProjectsRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Annual return deleted successfully',
        };
    }
}
