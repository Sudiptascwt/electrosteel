// services/section.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverviewDuctileIronPipes } from '../../../entity/overview.entity';
import { ProductDetails } from '../../../entity/product-details.entity';
import { Application } from '../../../entity/application.entity';
import { JointingSystems } from '../../../entity/jointing-systems.entity';
import { ProtectionInternal } from '../../../entity/protection-internal.entity';
import { ProtectionExternal } from '../../../entity/protection-external.entity';
import { SectionDto } from '../../../dto/section.dto';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(OverviewDuctileIronPipes)
        private overviewRepo: Repository<OverviewDuctileIronPipes>,
        @InjectRepository(ProductDetails)
        private productDetailsRepo: Repository<ProductDetails>,
        @InjectRepository(Application)
        private applicationRepo: Repository<Application>,
        @InjectRepository(JointingSystems)
        private jointingSystemsRepo: Repository<JointingSystems>,
        @InjectRepository(ProtectionInternal)
        private protectionInternalRepo: Repository<ProtectionInternal>,
        @InjectRepository(ProtectionExternal)
        private protectionExternalRepo: Repository<ProtectionExternal>,
    ) {}

    private getRepository(sectionType: string): Repository<any> {
        switch (sectionType) {
            case 'overview':
                return this.overviewRepo;
            case 'product-details':
                return this.productDetailsRepo;
            case 'application':
                return this.applicationRepo;
            case 'jointing-systems':
                return this.jointingSystemsRepo;
            case 'protection-internal':
                return this.protectionInternalRepo;
            case 'protection-external':
                return this.protectionExternalRepo;
            default:
                throw new Error(`Invalid section type: ${sectionType}`);
        }
    }

    private parseJsonFields(data: any): any {
        if (!data) return null;
        
        const parsed = { ...data };
        const jsonFields = ['image', 'tableData', 'productTable', 'listData', 'systems', 'table'];
        
        for (const field of jsonFields) {
            if (parsed[field] && typeof parsed[field] === 'string') {
                try {
                    parsed[field] = JSON.parse(parsed[field]);
                } catch (e) {
                    // Not JSON, keep as is
                }
            }
        }
        
        return parsed;
    }

    private stringifyJsonFields(data: any): any {
        if (!data) return null;
        
        const stringified = { ...data };
        const jsonFields = ['image', 'tableData', 'productTable', 'listData', 'systems', 'table'];
        
        for (const field of jsonFields) {
            if (stringified[field] && typeof stringified[field] === 'object') {
                stringified[field] = JSON.stringify(stringified[field]);
            }
        }
        
        return stringified;
    }

    async createOrUpdate(sectionType: string, data: SectionDto): Promise<any> {
        try {
            const repository = this.getRepository(sectionType);
            
            let existingRecord = null;
            if (data.id) {
                existingRecord = await repository.findOne({ where: { id: data.id } });
            } else {
                // Get first record if no ID provided
                const records = await repository.find({ take: 1 });
                existingRecord = records.length > 0 ? records[0] : null;
            }

            const toSave = this.stringifyJsonFields({
                ...(existingRecord || {}),
                ...data,
            });

            const saved = await repository.save(toSave);
            const parsedSaved = this.parseJsonFields(saved);
            
            return {
                status: true,
                statusCode: existingRecord ? 200 : 201,
                message: existingRecord 
                    ? `${sectionType} updated successfully` 
                    : `${sectionType} created successfully`,
                data: parsedSaved,
            };
        } catch (error) {
            throw new Error(`Failed to save ${sectionType}: ${error.message}`);
        }
    }

    async getData(sectionType: string, id?: number): Promise<any> {
        try {
            const repository = this.getRepository(sectionType);
            
            let data = null;
            if (id) {
                data = await repository.findOne({ where: { id } });
            } else {
                const records = await repository.find({ take: 1 });
                data = records.length > 0 ? records[0] : null;
            }

            if (!data) {
                return {
                    status: false,
                    statusCode: 404,
                    message: `${sectionType} not found`,
                    data: null,
                };
            }

            const parsedData = this.parseJsonFields(data);
            
            return {
                status: true,
                statusCode: 200,
                message: `${sectionType} fetched successfully`,
                data: parsedData,
            };
        } catch (error) {
            throw new Error(`Failed to fetch ${sectionType}: ${error.message}`);
        }
    }
}