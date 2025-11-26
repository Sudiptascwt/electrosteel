import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CorporateProfile } from '../../../entity/corporate_profile.entity';
import { CorporateProfileDto } from '../../../dto/corporate_profile.dto';
import { CorporateProfileTestimonialDto } from '../../../dto/coporate_profile_testimonial.dto';
import { CorporateProfileTestimonial } from '../../../entity/coporate_profile_testimonial.entity';
@Injectable()
export class CorporateProfileService {
    constructor(
        @InjectRepository(CorporateProfile)
        private readonly CorporateProfileRepository: Repository<CorporateProfile>,
        @InjectRepository(CorporateProfileTestimonial)
        private readonly testimonialRepo: Repository<CorporateProfileTestimonial>,
    ) {}
    

    // CREATE
    async create(dto: CorporateProfileDto) {
        const profile = this.CorporateProfileRepository.create({
            name1: dto.name1,
            name2: dto.name2,
            title: dto.title,
            image: dto.image,
            heading: dto.heading,
            description: dto.description,
            status: dto.status ?? 1,
        });

        const savedProfile = await this.CorporateProfileRepository.save(profile);

        if (dto.testimonials?.length) {
            const testimonials = dto.testimonials.map(t => {
            return this.testimonialRepo.create({
                ...t,
                corporate_profile_id: savedProfile.id,
            });
            });

            await this.testimonialRepo.save(testimonials);
        }

        return {
            status: true,
            message: "Corporate profile with testimonials created",
            data: savedProfile
        };
    }

    // GET ALL
    async findAll() {
        try {
            const data = await this.CorporateProfileRepository.find({ relations: ['testimonials'] });
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: data.length > 0 ? 'Corporate profile datas fetched successfully' : 'No Corporate profile datas found',
                data: data,
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
            const About = await this.CorporateProfileRepository.findOne({relations: ['testimonials'], where: { id } });
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
        // Load profile (no need for relations here, unless you want to inspect old testimonials)
        const profile = await this.CorporateProfileRepository.findOne({ where: { id } });
        if (!profile) {
        throw new NotFoundException({
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: `Corporate profile data with ID ${id} not found`,
        });
        }

        //Update main profile fields
        profile.name1 = updateDto.name1 ?? profile.name1;
        profile.name2 = updateDto.name2 ?? profile.name2;
        profile.title = updateDto.title ?? profile.title;
        profile.image = updateDto.image ?? profile.image;
        profile.description = updateDto.description ?? profile.description;
        profile.heading = updateDto.heading ?? profile.heading;
        profile.status = updateDto.status ?? profile.status;

        const updatedProfile = await this.CorporateProfileRepository.save(profile);

        //If testimonials key is present, replace them
        if (updateDto.testimonials) {
            // Delete existing testimonials for this profile
            await this.testimonialRepo.delete({ corporate_profile_id: id });

            // If array is non-empty, create new testimonials
            if (updateDto.testimonials.length) {
                const testimonials = updateDto.testimonials.map((t) =>
                    this.testimonialRepo.create({
                        ...t,
                        corporate_profile_id: id,
                    }),
                );

                await this.testimonialRepo.save(testimonials);
            }
        }

        //Reload with testimonials so response matches findById
        const reloaded = await this.CorporateProfileRepository.findOne({
        where: { id },
        relations: ['testimonials'],
        });

        return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Corporate profile data updated successfully',
        data: reloaded,
        };
    } catch (error) {
        if (error instanceof NotFoundException) {
        return {
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
        };
        }

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
                throw new NotFoundException({
                    message: 'Corporate profile data with ID ${id} not found',
                    error: 'Not Found',
                    statusCode: 404,
                    status: false,
                });
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
