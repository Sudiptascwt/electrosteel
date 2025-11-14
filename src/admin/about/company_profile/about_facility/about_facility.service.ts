import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutFacility } from '../../../../entity/company_profile_facility.entity';
import { AboutFacilityDto } from '../../../../dto/company_profile_facility.dto';

@Injectable()
export class AboutFacilityService {
    constructor(
        @InjectRepository(AboutFacility)
        private readonly AboutFacilityRepository: Repository<AboutFacility>,
    ) {}
    

    // CREATE
    async create(createDto: AboutFacilityDto) {
        try {
            const newAboutFacility = this.AboutFacilityRepository.create(createDto);
            const savedAboutFacility = await this.AboutFacilityRepository.save(newAboutFacility);

            return {
                status: true,
                statusCode: HttpStatus.CREATED,
                message: 'About facility created successfully',
                data: savedAboutFacility,
            };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while creating AboutFacility',
                error: error.message,
            };
        }
    }

    // GET ALL
    async findAll() {
        const data = await this.AboutFacilityRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'AboutFacility fetched successfully' : 'No AboutFacility found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.AboutFacilityRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `About facility with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'About facility fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: AboutFacilityDto) {
        const About = await this.AboutFacilityRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `About facility with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.AboutFacilityRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'About facility updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.AboutFacilityRepository.delete(id);
        if (result.affected == 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `About facility with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'About facility deleted successfully'
        };
    }
}
