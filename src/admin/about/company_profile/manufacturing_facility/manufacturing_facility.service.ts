import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutFacility } from '../../../../entity/company_profile_facility.entity';
import { AboutFacilityDto } from '../../../../dto/company_profile_facility.dto';
import { FacilityName } from 'src/entity/facility_name.entity';
import { FacilityNameDto } from 'src/dto/facility_name.dto';

@Injectable()
export class AboutFacilityService {
    constructor(
        @InjectRepository(AboutFacility)
        private readonly AboutFacilityRepository: Repository<AboutFacility>,
        @InjectRepository(FacilityName)
        private readonly FacilityNameRepository: Repository<FacilityName>,
    ) {}
    
    async create(body: any) {
        try {
        const { name1, name2, data } = body;

        const facilityName = this.FacilityNameRepository.create({ name1, name2 });
        const savedFacilityName = await this.FacilityNameRepository.save(facilityName);

        const facilitiesArray: AboutFacilityDto[] = Array.isArray(data) ? data : [data];

        const facilityEntities = this.AboutFacilityRepository.create(facilitiesArray);
        const savedFacilities = await this.AboutFacilityRepository.save(facilityEntities);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'About facility created successfully',
            data: {
            ...savedFacilityName, 
            facilities: savedFacilities,
            },
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
    try {
        const facilities = await this.AboutFacilityRepository.find();

        // get first facilityName row (if any)
        const [facilityName] = await this.FacilityNameRepository.find({
        order: { id: 'ASC' },
        take: 1,
        });

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message:
                facilities.length > 0
                ? 'AboutFacility fetched successfully'
                : 'No AboutFacility found',
            data: {
                name1: facilityName?.name1 ?? null,
                name2: facilityName?.name2 ?? null,
                data: facilities,
            },
        };
    } catch (error) {
        return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while fetching AboutFacility',
        error: error.message,
        };
    }
    }

    // GET BY ID
    async findById(id: number) {
        try{
            const facility = await this.AboutFacilityRepository.findOne({ where: { id } });
            const [facilityName] = await this.FacilityNameRepository.find({
                order: { id: 'ASC' },
                take: 1,
            });

            if (!facility) {
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
                data: {
                    name1: facilityName?.name1 ?? null,
                    name2: facilityName?.name2 ?? null,
                    facility: facility, 
                },
            };
        } catch (error) {
            return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while updating AboutFacility',
            error: error.message,
            };
        }
    }

    // UPDATE
    async update(id: number, body: any) {
        try {
            const { name1, name2, data } = body;

            const facility = await this.AboutFacilityRepository.findOne({ where: { id } });

            if (!facility) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `About facility with ID ${id} not found`,
            });
            }

            let facilityName = await this.FacilityNameRepository.findOne({
            where: { status: 1 },  
            order: { id: 'ASC' },
            });

            if (!facilityName) {
            facilityName = this.FacilityNameRepository.create({});
            }

            if (name1 !== undefined) facilityName.name1 = name1;
            if (name2 !== undefined) facilityName.name2 = name2;

            const updatedFacilityName = await this.FacilityNameRepository.save(facilityName);

            const updateData = Array.isArray(data) ? data[0] : data;

            Object.assign(facility, updateData);
            const updatedFacility = await this.AboutFacilityRepository.save(facility);

            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'About facility updated successfully',
                data: {
                ...updatedFacilityName, 
                facility: updatedFacility,
                },
            };
        } catch (error) {
            return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while updating AboutFacility',
            error: error.message,
            };
        }
    }


    // DELETE
    async delete(id: number) {
        try {
            const result = await this.AboutFacilityRepository.delete(id);

            if (result.affected === 0) {
                throw new NotFoundException({
                    status: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `About facility with ID ${id} not found`,
                });
            }

            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'About facility deleted successfully',
            };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while updating AboutFacility',
                error: error.message,
            };
        }
    }

}
