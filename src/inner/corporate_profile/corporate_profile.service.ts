import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CorporateProfile } from '../../entity/corporate_profile.entity';
import { CorporateProfileDto } from '../../dto/corporate_profile.dto';
@Injectable()
export class CorporateProfileService {
    constructor(
        @InjectRepository(CorporateProfile)
        private readonly CorporateProfileRepository: Repository<CorporateProfile>,
    ) {}
    

    // CREATE
    async create(createDto: CorporateProfileDto) {
        try {
        const newCorporateProfile = this.CorporateProfileRepository.create(createDto);
        const savedCorporateProfile = await this.CorporateProfileRepository.save(newCorporateProfile);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Corporate profile data created successfully',
            data: savedCorporateProfile,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Corporate profile data',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.CorporateProfileRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Corporate profile datas fetched successfully' : 'No Corporate profile datas found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.CorporateProfileRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Corporate profile data with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Corporate profile data fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: CorporateProfileDto) {
        const About = await this.CorporateProfileRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Corporate profile data with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.CorporateProfileRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Corporate profile data updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.CorporateProfileRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Corporate profile data with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Corporate profile data deleted successfully'
        };
    }
}
