import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policies } from '../../entity/policies.entity';
import { PoliciesDto } from '../../dto/policies.dto';
@Injectable()
export class PoliciesService {
    constructor(
        @InjectRepository(Policies)
        private readonly PoliciesRepository: Repository<Policies>,
    ) {}

    // CREATE
    async create(createDto: PoliciesDto) {
        try {
        const newPolicies = this.PoliciesRepository.create(createDto);
        const savedPolicies = await this.PoliciesRepository.save(newPolicies);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Policy created successfully',
            data: savedPolicies,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Policies',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.PoliciesRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Policies fetched successfully' : 'No Policies found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.PoliciesRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Policies with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Policy fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: PoliciesDto) {
        const About = await this.PoliciesRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Policies with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.PoliciesRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Policy updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.PoliciesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Policy with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Policy deleted successfully'
        };
    }
}
