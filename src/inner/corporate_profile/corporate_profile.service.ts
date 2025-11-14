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
        try {
            const data = await this.CorporateProfileRepository.find();
            const result = data.map(item => ({
                [item.page_meta_key]: item.page_meta_value
            }));
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: data.length > 0 ? 'Corporate profile datas fetched successfully' : 'No Corporate profile datas found',
                data: result,
            };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while fetching Corporate profile data',
                error: error.message,
            }
        }
    }

    // GET BY ID
    async findById(id: number) {
        try {
            const About = await this.CorporateProfileRepository.findOne({ where: { id } });
            if (!About) {
                throw new NotFoundException({
                    status: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Corporate profile data with ID ${id} not found`,
                });
            }
            const result = {
                [About.page_meta_key]: About.page_meta_value
            };
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'Corporate profile data fetched successfully',
                data: result,
            };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while fetching Corporate profile data',
                error: error.message,
            };
        }
    }

    // UPDATE
    async update(id: number, updateDto: CorporateProfileDto) {
        try {
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
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while updating Corporate profile data',
                error: error.message,
            };
        }
    }

    // DELETE
    async delete(id: number) {
        try {
            const result = await this.CorporateProfileRepository.delete(id);

            if (result.affected === 0) {
                // Proper 404
                throw new NotFoundException(`Corporate profile data with ID ${id} not found`);
            }

            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'Corporate profile data deleted successfully',
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return {
                    status: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: error.message,
                };
            }

            console.error(error); 
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while deleting Corporate profile data',
            };
        }
    }
}
