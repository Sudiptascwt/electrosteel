import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardCommitteType } from '../../../entity/board_committee_type.entity';
import { BoardCommitteTypeDto } from '../../../dto/board_committee_type.dto';
import { BoardCommitteDetails } from 'src/entity/board_committe_details.entity';
import { BoardCommitteDetailsDto } from 'src/dto/board_committe_details.dto';
import { headingsDto } from 'src/dto/headings.dto';
import { headings } from 'src/entity/headings.entity';
import { board_commitee_hero_data } from 'src/entity/board_commitee_hero_data.entity';
import { board_commitee_hero_dataDto } from 'src/dto/board_commitee_hero_data.dto';
import { BoardCommitteData } from 'src/entity/board_commitee_data.entity';
import { BoardCommitteDataDto } from 'src/dto/board_commitee_data.dto';

@Injectable()
export class BoardCommitteTypeService {
    constructor(
        @InjectRepository(BoardCommitteType)
        private readonly BoardCommitteTypeRepository: Repository<BoardCommitteType>,

        @InjectRepository(BoardCommitteDetails) 
        private readonly BoardCommitteDetailsRepository: Repository<BoardCommitteDetails>,

        @InjectRepository(board_commitee_hero_data)
        private readonly board_commitee_hero_dataRepository: Repository<board_commitee_hero_data>,

        @InjectRepository(BoardCommitteData)
        private readonly board_commitee_dataRepository: Repository<BoardCommitteData>,
    ) {}

    ////////////////////new////////////////////////////////////

    async boardCommitteHeroData(dto: board_commitee_hero_dataDto) {
        try {
            const existing = await this.board_commitee_hero_dataRepository.findOne({
                where: {}  
            });
            
            let saved;
            
            if (existing) {
                // Update existing record
                Object.assign(existing, dto);
                saved = await this.board_commitee_hero_dataRepository.save(existing);
                
                return {
                    status: true,
                    statusCode: HttpStatus.OK,
                    message: 'Board committee data updated successfully',
                    data: saved,
                };
            } else {
                // Create new record
                const created = this.board_commitee_hero_dataRepository.create({
                    ...dto,
                });
                saved = await this.board_commitee_hero_dataRepository.save(created);
                
                return {
                    status: true,
                    statusCode: HttpStatus.CREATED,
                    message: 'Board committee data created successfully',
                    data: saved
                };
            }
        } catch (error) {
            console.error('Error in board committee hero data:', error);
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to save board committee data',
                error: error.message
            };
        }
    }

    // GET ALL
    async findAllboardCommitteHeroData() {
        const data = await this.board_commitee_hero_dataRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'BoardCommitte hero data fetched successfully' : 'No BoardCommitte hero data found',
            data,
        };
    }

    async saveboardCommitteData(data: any) {
    try {
        // Check if data is an array
        if (!Array.isArray(data)) {
        return {
            status: false,
            statusCode: 400,
            message: 'Invalid data format. Expected array of committee objects.',
            error: 'Data must be an array'
        };
        }

        if (data.length === 0) {
        return {
            status: false,
            statusCode: 400,
            message: 'Data array cannot be empty',
        };
        }

        // Prepare data for saving - stringify the rows
        const recordsToSave = data.map(committee => ({
        title: committee.title,
        rows: JSON.stringify(committee.rows) // Convert array to JSON string
        }));

        console.log('Records to save:', JSON.stringify(recordsToSave, null, 2));

        // Clear existing records
        await this.board_commitee_dataRepository.clear();
        
        // Create new records
        const newRecords = this.board_commitee_dataRepository.create(recordsToSave);
        const savedRecords = await this.board_commitee_dataRepository.save(newRecords);
        
        // Parse rows back to array for response
        const formattedRecords = savedRecords.map(record => ({
        ...record,
        rows: JSON.parse(record.rows) // Convert string back to array
        }));
        
        return {
        status: true,
        statusCode: 200,
        message: `${savedRecords.length} Board committee records saved successfully.`,
        data: formattedRecords
        };

    } catch (error) {
        console.error('Error in Board committee data:', error);
        return {
        status: false,
        statusCode: 500,
        message: 'Failed to save Board committee data',
        error: error.message
        };
    }
    }

    async findAllboardCommitteData() {
        try {
        let people_data = await this.board_commitee_dataRepository.find();
        const formattedCommittee = people_data.map((item) => ({
            ...item,
            rows: item.rows ? JSON.parse(item.rows) : [],
        }));
        
        return {
            status: true,
            statusCode: 200,
            message: 'Board committee data fetched successfully',
            data: formattedCommittee
        };
        } catch (error) {
        console.error('Error:', error);
        return {
            status: false,
            statusCode: 500,
            message: 'Failed to fetch Board committee data',
            error: error.message
        };
        }
    }
}
