// src/fac/paint_fac.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Fac } from '../../../entity/paint_fac.entity';
import { CreateFacDto } from '../../../dto/paint_fac.dto';

@Injectable()
export class FacService {
    constructor(
        @InjectRepository(Fac)
        private facRepository: Repository<Fac>,
        @InjectDataSource()
        private dataSource: DataSource,
    ) {}

    async ensureCategoryColumn() {
        try {
            // Check if category column exists
            const result = await this.dataSource.query(`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = 'fac' AND COLUMN_NAME = 'category'
            `);
            
            if (result.length === 0) {
                // Add category column
                await this.dataSource.query(`
                    ALTER TABLE fac 
                    ADD COLUMN category VARCHAR(255) NULL,
                    ADD UNIQUE INDEX idx_fac_category (category)
                `);
                console.log('Category column added successfully');
            }
        } catch (error) {
            console.error('Error ensuring category column:', error);
        }
    }

    async upsertByCategory(createFacDto: CreateFacDto): Promise<Fac> {
        try {
            // Ensure column exists
            await this.ensureCategoryColumn();
            
            const { category } = createFacDto;
            
            if (!category) {
                throw new BadRequestException('Category is required');
            }
            
            // Prepare data
            const dataToSave = {
                ...createFacDto,
                tableData: createFacDto.tableData ? JSON.stringify(createFacDto.tableData) : null
            };
            
            // Find existing
            const existing = await this.facRepository.findOne({ 
                where: { category: category }
            });
            
            if (existing) {
                // Update
                await this.facRepository.update(existing.id, dataToSave);
                const updated = await this.facRepository.findOne({ where: { category } });
                
                // Parse JSON fields for response
                if (updated.tableData && typeof updated.tableData === 'string') {
                    updated.tableData = JSON.parse(updated.tableData);
                }
                return updated;
            } else {
                // Create
                const fac = this.facRepository.create(dataToSave);
                const saved = await this.facRepository.save(fac);
                
                // Parse JSON fields for response
                if (saved.tableData && typeof saved.tableData === 'string') {
                    saved.tableData = JSON.parse(saved.tableData);
                }
                return saved;
            }
        } catch (error) {
            console.error('Error in upsertByCategory:', error);
            throw error;
        }
    }

    async findByCategory(category: string): Promise<Fac> {
        await this.ensureCategoryColumn();
        
        const fac = await this.facRepository.findOne({ 
            where: { category: category }
        });
        
        if (!fac) {
            throw new NotFoundException(`Fac with category "${category}" not found`);
        }
        
        // Parse JSON fields
        if (fac.tableData && typeof fac.tableData === 'string') {
            try {
                fac.tableData = JSON.parse(fac.tableData);
            } catch (e) {}
        }
        
        if (fac.card && typeof fac.card === 'string') {
            try {
                fac.card = JSON.parse(fac.card as any);
            } catch (e) {}
        }
        
        return fac;
    }
}