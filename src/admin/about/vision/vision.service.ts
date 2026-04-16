import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vision } from '../../../entity/vision.entity';
import { VisionDto } from '../../../dto/vision.dto';
import { VisionPrinciples } from '../../../entity/vision_principles.entity';
import { VisionPrinciplesDto } from '../../../dto/vision_principles.dto';   
import { headings } from 'src/entity/headings.entity';
import { headingsDto } from 'src/dto/headings.dto';
import { Mission } from 'src/entity/mission.entity';
import { MissionDto } from 'src/dto/mission.dto';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(Vision)
        private readonly VisionRepository: Repository<Vision>,
        @InjectRepository(VisionPrinciples)
        private readonly VisionPrinciplesRepository: Repository<VisionPrinciples>,
        @InjectRepository(headings)
        private readonly headingsRepository: Repository<headings>,
        @InjectRepository(Mission)
        private readonly MissionRepository: Repository<Mission>,
    ) {}

    // CREATE
    async createVisionBanner(dto: headingsDto) {
        try {
            const existing = await this.headingsRepository.findOne({
            where: { section_type: 'vision' } 
            });
            
            let saved;
            
            if (existing) {
            Object.assign(existing, dto);
            saved = await this.headingsRepository.save(existing);
            
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'Vision updated successfully',
                data: saved,
            };
            } else {
                const created = this.headingsRepository.create({
                    ...dto,
                    section_type: 'vision'
                });
                saved = await this.headingsRepository.save(created);
                
                return {
                    status: true,
                    statusCode: HttpStatus.CREATED,
                    message: 'Vision created successfully',
                    data: saved
                };
            }
        } catch (error) {
            console.error('Error in vision:', error);
            return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to save vision data',
            error: error.message
            };
        }
    }

    async findVisionBanner() {
        const data = await this.headingsRepository.find({
            where: { section_type: 'vision' } 
        });
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Vision fetched successfully' : 'No Vision found',
            data,
        };
    }

    async createVision(dto: any) {
        try {
            const existing = await this.VisionRepository.find();
            
            let saved;
            
            if (existing && existing.length > 0) {
                const recordToUpdate = existing[0];
                Object.assign(recordToUpdate, dto);
                saved = await this.VisionRepository.save(recordToUpdate);
                
                return {
                    status: true,
                    statusCode: HttpStatus.OK,
                    message: 'Vision updated successfully',
                    data: saved,
                };
            } else {
                    // Create new record
                    const created = this.VisionRepository.create(dto);
                    saved = await this.VisionRepository.save(created);
                    
                    return {
                        status: true,
                        statusCode: HttpStatus.CREATED,
                        message: 'Vision created successfully',
                        data: saved
                    };
            }
        } catch (error) {
            console.error('Error in vision:', error);
            return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to save vision data',
            error: error.message
            };
        }
    }

    // GET ALL
    async findAllVision() {
        const data = await this.VisionRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Vision fetched successfully' : 'No Vision found',
            data,
        };
    }

    //Mission
    async createMission(dto: any) {
        try {
            const existing = await this.MissionRepository.find();
            
            let saved;
            
            if (existing && existing.length > 0) {
                const recordToUpdate = existing[0];
                Object.assign(recordToUpdate, dto);
                saved = await this.MissionRepository.save(recordToUpdate);
                
                return {
                    status: true,
                    statusCode: HttpStatus.OK,
                    message: 'Vision updated successfully',
                    data: saved,
                };
            } else {
                    // Create new record
                    const created = this.MissionRepository.create(dto);
                    saved = await this.MissionRepository.save(created);
                    
                    return {
                        status: true,
                        statusCode: HttpStatus.CREATED,
                        message: 'Vision created successfully',
                        data: saved
                    };
            }
        } catch (error) {
            console.error('Error in vision:', error);
            return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to save vision data',
            error: error.message
            };
        }
    }

    // GET ALL
    async findAllMission() {
        const data = await this.MissionRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Mission fetched successfully' : 'No Mission found',
            data,
        };
    }

    // CREATE
    async createPrinciples(data: any) {
        try {
            const sectionType = "vision_principle";
            const title = data.title || data.heading;
            const description = data.description || data.subheading;
            
            if (!title) {
                throw new Error('Title or heading is required');
            }
            
            let heading = await this.headingsRepository.findOne({
                where: { section_type: sectionType }
            });

            if (heading) {
                heading.title = title;
                heading.description = description;
                await this.headingsRepository.save(heading);
            } else {
                const newHeading = this.headingsRepository.create({
                    title: title,
                    description: description,
                    section_type: sectionType
                });
                heading = await this.headingsRepository.save(newHeading);
            }

            await this.MissionRepository.clear();
            
            let savedFacilities = [];

            const itemsArray = data.data || data.facilities || [];
            
            if (itemsArray && Array.isArray(itemsArray) && itemsArray.length > 0) {
                const facilities = itemsArray.map(facility => 
                    this.MissionRepository.create({
                        title: facility.title,
                        description: facility.description,
                        image: facility.image
                    })
                );
                savedFacilities = await this.MissionRepository.save(facilities);
            }

            return {
                status: true,
                statusCode: heading ? 200 : 201,
                message: heading ? 'Vision principle data updated successfully.' : 'Vision principle data created successfully.',
                data: {
                    heading: heading,
                    facilities: savedFacilities
                }
            };
        }
        catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while creating Vision',
                error: error.message,
            };
        }
    }

    // GET ALL
    async findAllPrinciples() {
        const data = await this.VisionPrinciplesRepository.find({});
        const heading = await this.headingsRepository.findOne({
            where: { section_type: 'vision_principle' }
        });
        
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Vision principle data fetched successfully' : 'No Vision found',
            data: {
                heading: heading,  
                principles: data
            }
        };
    }
}
