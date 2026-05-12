import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverviewDuctileIronPipes } from '../../../entity/overview.entity';
import { ProductDetails } from '../../../entity/product-details.entity';
import { Application } from '../../../entity/application.entity';
import { JointingSystems } from '../../../entity/jointing-systems.entity';
import { ProtectionInternal } from '../../../entity/protection-internal.entity';
import { ProtectionExternal } from '../../../entity/protection-external.entity';

@Injectable()
export class DuctileIronFittingService {
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
            case 'overview': return this.overviewRepo;
            case 'product-details': return this.productDetailsRepo;
            case 'application': return this.applicationRepo;
            case 'jointing-systems': return this.jointingSystemsRepo;
            case 'protection-internal': return this.protectionInternalRepo;
            case 'protection-external': return this.protectionExternalRepo;
            default: throw new Error(`Invalid section type: ${sectionType}`);
        }
    }

    private parseJsonFields(data: any): any {
        if (!data) return null;
        const parsed = { ...data };
        const jsonFields = ['image', 'tableData', 'productTable', 'listData', 'systems', 'table', 'desc', 'dimensionImage', 'tableExtraData'];
        
        for (const field of jsonFields) {
            if (parsed[field] && typeof parsed[field] === 'string') {
                try {
                    parsed[field] = JSON.parse(parsed[field]);
                } catch (e) {}
            }
        }
        return parsed;
    }

    private stringifyJsonFields(data: any): any {
        if (!data) return null;
        const stringified = { ...data };
        const jsonFields = ['image', 'tableData', 'productTable', 'listData', 'systems', 'table', 'desc', 'dimensionImage', 'tableExtraData'];
        
        for (const field of jsonFields) {
            if (stringified[field] && typeof stringified[field] === 'object') {
                stringified[field] = JSON.stringify(stringified[field]);
            }
        }
        return stringified;
    }

    // async createOrUpdate(sectionType: string, data: any): Promise<any> {
    //     try {
    //         const repository = this.getRepository(sectionType);
            
    //         // Handle Application section (array of records)
    //         if (sectionType === 'application' && Array.isArray(data)) {
    //             await repository.clear();
    //             const savedRecords = [];
    //             for (const item of data) {
    //                 const newRecord = repository.create({
    //                     title: item.title,
    //                     image1: item.image1,
    //                     image2: item.image2,
    //                     description: item.description,
    //                     icon: item.icon,
    //                 });
    //                 const saved = await repository.save(newRecord);
    //                 savedRecords.push(saved);
    //             }
    //             return {
    //                 status: true,
    //                 statusCode: 200,
    //                 message: 'Application created/updated successfully',
    //                 data: savedRecords,
    //             };
    //         }

    //         // Handle single record for all sections
    //         let existingRecord = null;
    //         if (data.id) {
    //             existingRecord = await repository.findOne({ where: { id: data.id } });
    //         } else {
    //             const records = await repository.find({ take: 1 });
    //             existingRecord = records.length > 0 ? records[0] : null;
    //         }

    //         // Special mapping for product-details
    //         let mappedData = { ...data };
    //         if (sectionType === 'product-details') {
    //             if (data.description !== undefined) {
    //                 mappedData.desc = data.description;
    //                 delete mappedData.description;
    //             }
    //             if (data.tableData !== undefined) {
    //                 mappedData.productTable = data.tableData;
    //                 delete mappedData.tableData;
    //             }
    //             // FIX: Add tableExtraData to be saved
    //             if (data.tableExtraData !== undefined) {
    //                 mappedData.tableExtraData = data.tableExtraData;
    //             }
    //         }

    //         const mergedData = {
    //             ...(existingRecord || {}),
    //             ...mappedData,
    //         };

    //         const toSave = this.stringifyJsonFields(mergedData);
    //         const saved = await repository.save(toSave);
    //         let parsedSaved = this.parseJsonFields(saved);

    //         // Map back for response (product-details)
    //         if (sectionType === 'product-details') {
    //             const transformed: any = {
    //                 id: parsedSaved.id,
    //                 title: parsedSaved.title,
    //                 description: parsedSaved.desc || parsedSaved.description,
    //                 created_at: parsedSaved.created_at,
    //                 updated_at: parsedSaved.updated_at,
    //             };
    //             if (parsedSaved.dimensionTitle) transformed.dimensionTitle = parsedSaved.dimensionTitle;
    //             if (parsedSaved.dimensionImage) transformed.dimensionImage = parsedSaved.dimensionImage;
    //             if (parsedSaved.productTable) transformed.tableData = parsedSaved.productTable;
    //             // FIX: Include tableExtraData in response
    //             if (parsedSaved.tableExtraData) transformed.tableExtraData = parsedSaved.tableExtraData;
                
    //             parsedSaved = transformed;
    //         }

    //         return {
    //             status: true,
    //             statusCode: existingRecord ? 200 : 201,
    //             message: existingRecord ? `${sectionType} updated successfully` : `${sectionType} created successfully`,
    //             data: parsedSaved,
    //         };
    //     } catch (error) {
    //         throw new Error(`Failed to save ${sectionType}: ${error.message}`);
    //     }
    // }

    async createOrUpdate(
        sectionType: string,
        category: string,
        data: any,
        ): Promise<any> {
        try {
            const repository = this.getRepository(sectionType);

            const normalizedCategory = category.replace(/-/g, '_');

            // Application section - array records
            if (sectionType === 'application' && Array.isArray(data)) {
            await repository.delete({ category: normalizedCategory });

            const savedRecords = [];

            for (const item of data) {
                const newRecord = repository.create({
                category: normalizedCategory,
                title: item.title,
                image1: item.image1,
                image2: item.image2,
                description: item.description,
                icon: item.icon,
                });

                const saved = await repository.save(newRecord);
                savedRecords.push(saved);
            }

            return {
                status: true,
                statusCode: 200,
                message: 'Application created/updated successfully',
                data: savedRecords,
            };
            }

            // Single record sections
            let existingRecord = null;

            if (data.id) {
            existingRecord = await repository.findOne({
                where: {
                id: data.id,
                category: normalizedCategory,
                },
            });
            } else {
            const records = await repository.find({
                where: {
                category: normalizedCategory,
                },
                take: 1,
            });

            existingRecord = records.length > 0 ? records[0] : null;
            }

            let mappedData = {
            ...data,
            category: normalizedCategory,
            };

            // Product details mapping
            if (sectionType === 'product-details') {
            if (data.description !== undefined) {
                mappedData.desc = data.description;
                delete mappedData.description;
            }

            if (data.tableData !== undefined) {
                mappedData.productTable = data.tableData;
                delete mappedData.tableData;
            }

            if (data.tableExtraData !== undefined) {
                mappedData.tableExtraData = data.tableExtraData;
            }
            }

            const mergedData = {
            ...(existingRecord || {}),
            ...mappedData,
            };

            const toSave = this.stringifyJsonFields(mergedData);
            const saved = await repository.save(toSave);

            let parsedSaved = this.parseJsonFields(saved);

            if (sectionType === 'product-details') {
            parsedSaved = {
                id: parsedSaved.id,
                category: parsedSaved.category,
                title: parsedSaved.title,
                description: parsedSaved.desc || parsedSaved.description,
                dimensionTitle: parsedSaved.dimensionTitle,
                dimensionImage: parsedSaved.dimensionImage,
                tableData: parsedSaved.productTable,
                tableExtraData: parsedSaved.tableExtraData,
                created_at: parsedSaved.created_at,
                updated_at: parsedSaved.updated_at,
            };
            }

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

    // async getData(sectionType: string, id?: number): Promise<any> {
    //     try {
    //         const repository = this.getRepository(sectionType);

    //         // Handle Application section - return all records as array
    //         if (sectionType === 'application') {
    //             const records = await repository.find({ order: { id: 'ASC' } });
    //             return {
    //                 status: true,
    //                 statusCode: 200,
    //                 message: 'Application fetched successfully',
    //                 data: records,
    //             };
    //         }

    //         // Handle single record for other sections
    //         let data = null;
    //         if (id) {
    //             data = await repository.findOne({ where: { id } });
    //         } else {
    //             const records = await repository.find({ take: 1 });
    //             data = records.length > 0 ? records[0] : null;
    //         }

    //         if (!data) {
    //             return {
    //                 status: false,
    //                 statusCode: 404,
    //                 message: `${sectionType} not found`,
    //                 data: null,
    //             };
    //         }

    //         let parsedData = this.parseJsonFields(data);

    //         // Transform product-details response
    //         if (sectionType === 'product-details') {
    //             const transformed: any = {
    //                 id: parsedData.id,
    //                 title: parsedData.title,
    //                 description: parsedData.desc,
    //                 created_at: parsedData.created_at,
    //                 updated_at: parsedData.updated_at,
    //             };
    //             if (parsedData.dimensionTitle) transformed.dimensionTitle = parsedData.dimensionTitle;
    //             if (parsedData.dimensionImage) transformed.dimensionImage = parsedData.dimensionImage;
    //             if (parsedData.productTable) transformed.tableData = parsedData.productTable;
    //             // FIX: Include tableExtraData in response
    //             if (parsedData.tableExtraData) transformed.tableExtraData = parsedData.tableExtraData;
    //             parsedData = transformed;
    //         }

    //         return {
    //             status: true,
    //             statusCode: 200,
    //             message: `${sectionType} fetched successfully`,
    //             data: parsedData,
    //         };
    //     } catch (error) {
    //         throw new Error(`Failed to fetch ${sectionType}: ${error.message}`);
    //     }
    // }

    async getData(
    sectionType: string,
    category: string,
    id?: number,
    ): Promise<any> {
    try {
        const repository = this.getRepository(sectionType);

        const normalizedCategory = category.replace(/-/g, '_');

        // Application section - array records
        if (sectionType === 'application') {
        const records = await repository.find({
            where: {
            category: normalizedCategory,
            },
            order: { id: 'ASC' },
        });

        return {
            status: true,
            statusCode: 200,
            message: 'Application fetched successfully',
            data: records,
        };
        }

        // Single record sections
        let data = null;

        if (id) {
        data = await repository.findOne({
            where: {
            id,
            category: normalizedCategory,
            },
        });
        } else {
        const records = await repository.find({
            where: {
            category: normalizedCategory,
            },
            take: 1,
        });

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

        let parsedData = this.parseJsonFields(data);

        // Product details response mapping
        if (sectionType === 'product-details') {
        parsedData = {
            id: parsedData.id,
            category: parsedData.category,
            title: parsedData.title,
            description: parsedData.desc || parsedData.description,
            dimensionTitle: parsedData.dimensionTitle,
            dimensionImage: parsedData.dimensionImage,
            tableData: parsedData.productTable,
            tableExtraData: parsedData.tableExtraData,
            created_at: parsedData.created_at,
            updated_at: parsedData.updated_at,
        };
        }

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