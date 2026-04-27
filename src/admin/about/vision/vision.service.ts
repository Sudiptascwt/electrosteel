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
    async createOrUpdatePrinciples(data: any) {
        try {
            const sectionType = "vision_principle";
            const title = data.title || data.heading;
            const description = data.description || data.subheading;
            
            if (!title) {
                throw new Error('Title or heading is required');
            }
            
            // ==================== HANDLE HEADING ====================
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

            // ==================== HANDLE VISION PRINCIPLES ====================
            let savedPrinciples = [];
            const itemsArray = data.data || data.facilities || [];

            if (itemsArray && Array.isArray(itemsArray)) {
                // ✅ FIX: Use clear() instead of delete({})
                await this.VisionPrinciplesRepository.clear();
                
                if (itemsArray.length > 0) {
                    // CREATE new principles
                    const principles = itemsArray.map(item => 
                        this.VisionPrinciplesRepository.create({
                            title: item.title,
                            description: item.description,
                            image: item.image
                        })
                    );
                    savedPrinciples = await this.VisionPrinciplesRepository.save(principles);
                }
            }

            // Verify save was successful
            const verifySaved = await this.VisionPrinciplesRepository.find();
            console.log('✅ Verification - Principles in DB after save:', verifySaved.length);

            return {
                status: true,
                statusCode: 200,
                message: 'Vision principle data saved successfully.',
                data: {
                    heading: heading,
                    facilities: savedPrinciples
                }
            };
        }
        catch (error) {
            console.error('Error:', error);
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while saving Vision data',
                error: error.message,
            };
        }
    }
    // GET ALL Vision Principles
    async findAllPrinciples() {
        const principles = await this.VisionPrinciplesRepository.find({
        order: { id: 'ASC' }
        });
        
        const heading = await this.headingsRepository.findOne({
        where: { section_type: 'vision_principle' }
        });
        
        const formattedPrinciples = principles.map(item => ({
        title: item.title,
        description: item.description,
        image: item.image
        }));
        
        return {
        heading: heading?.title || null,
        description: heading?.description || null,
        facilities: formattedPrinciples
        };
    }

}
