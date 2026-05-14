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
export class DuctileIronPipesService {
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

    async createOrUpdate(sectionType: string, data: any, category?: string): Promise<any> {
    try {
        const repository = this.getRepository(sectionType);
        
        // Handle Application section (array of records)
        if (sectionType === 'application' && Array.isArray(data)) {
            // Clear only records for this category, not all!
            if (category) {
                const existingRecords = await repository.find({ where: { category: category } });
                for (const record of existingRecords) {
                    await repository.remove(record);
                }
            } else {
                await repository.clear();
            }
            
            const savedRecords = [];
            for (const item of data) {
                const newRecord = repository.create({
                    title: item.title,
                    image1: item.image1,
                    image2: item.image2,
                    description: item.description,
                    icon: item.icon,
                    category: category || item.category, // Add category
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

        // Handle single record for all sections
        let existingRecord = null;
        
        // Build where clause based on category
        const whereClause: any = {};
        
        if (data.id) {
            whereClause.id = data.id;
            // If ID is provided, also filter by category to ensure correct record
            if (category && sectionType !== 'product-details') {
                whereClause.category = category;
            }
            existingRecord = await repository.findOne({ where: whereClause });
        } else {
            // If no ID, find by category first
            if (category && sectionType !== 'product-details') {
                const records = await repository.find({ 
                    where: { category: category },
                    take: 1 
                });
                existingRecord = records.length > 0 ? records[0] : null;
            }
            
            // If no record found with category, try without category (backward compatibility)
            if (!existingRecord) {
                const records = await repository.find({ take: 1 });
                existingRecord = records.length > 0 ? records[0] : null;
            }
        }

        // Special mapping for product-details
        let mappedData = { ...data };
        if (sectionType === 'product-details') { // Fixed from 'product-details'
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

        // Ensure category is set for the record
        if (category && sectionType !== 'product-details') {
            mappedData.category = category;
        }

        const mergedData = {
            ...(existingRecord || {}),
            ...mappedData,
        };

        const toSave = this.stringifyJsonFields(mergedData);
        const saved = await repository.save(toSave);
        let parsedSaved = this.parseJsonFields(saved);

        // Map back for response (product-details)
        if (sectionType === 'product-details') {
            const transformed: any = {
                id: parsedSaved.id,
                title: parsedSaved.title,
                description: parsedSaved.desc || parsedSaved.description,
                created_at: parsedSaved.created_at,
                updated_at: parsedSaved.updated_at,
            };
            if (parsedSaved.dimensionTitle) transformed.dimensionTitle = parsedSaved.dimensionTitle;
            if (parsedSaved.dimensionImage) transformed.dimensionImage = parsedSaved.dimensionImage;
            if (parsedSaved.productTable) transformed.tableData = parsedSaved.productTable;
            if (parsedSaved.tableExtraData) transformed.tableExtraData = parsedSaved.tableExtraData;
            
            parsedSaved = transformed;
        }

        return {
            status: true,
            statusCode: existingRecord ? 200 : 201,
            message: existingRecord ? `${sectionType} updated successfully` : `${sectionType} created successfully`,
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

//     async getData(sectionType: string, id?: number, category?: string): Promise<any> {
//     try {
//         // Normalize sectionType (handle kebab-case)
//         const normalizedSectionType = sectionType.replace(/-/g, '');
        
//         // ================= ALL SECTIONS =================
//         if (normalizedSectionType === 'all') {
//             // const sections = [
//             //     'overview',
//             //     'productDetails',
//             //     'application',
//             //     'jointingSystems',
//             //     'protectionInternal',
//             //     'protectionExternal',
//             // ];

//             const sections = ['overview', 'product-details', 'application', 'jointing-systems', 'protection-internal', 'protection-external'];

//             const allData: any = {};

//             // const heroSection = await this.bannerRepo.findOne({
//             //     where: {
//             //         page_name: category || 'ductile-iron-pipes',
//             //     },
//             // });

//             // allData.heroSection = heroSection;

//             for (const section of sections) {
//                 const response = await this.getData(section, id, category);
//                 allData[section] = response.data;
//             }

//             return {
//                 status: true,
//                 statusCode: 200,
//                 message: 'All sections fetched successfully',
//                 data: allData,
//             };
//         }

//         // ================= SINGLE SECTION =================
//         const repository = this.getRepository(normalizedSectionType);
        
//         // Build where clause with category
//         const whereClause: any = {};
        
//         if (id) {
//             whereClause.id = id;
//         }
        
//         // Add category filter for sections that have it
//         if (category && !['product-details'].includes(normalizedSectionType)) {
//             whereClause.category = category;
//         }
        
//         let data = null;
        
//         if (id) {
//             // Fetch by ID and optionally category
//             data = await repository.findOne({ where: whereClause });
//         } else {
//             // Fetch first record matching category
//             const query: any = { take: 1 };
//             if (Object.keys(whereClause).length > 0) {
//                 query.where = whereClause;
//             }
//             const records = await repository.find(query);
//             data = records.length > 0 ? records[0] : null;
//         }
        
//         if (!data) {
//             return {
//                 status: false,
//                 statusCode: 404,
//                 message: `${sectionType} not found${category ? ` for category: ${category}` : ''}`,
//                 data: null,
//             };
//         }

//         let parsedData = this.parseJsonFields(data);

//         // Handle product details transformation
//         if (normalizedSectionType === 'product-details') {
//             const transformed: any = {
//                 id: parsedData.id,
//                 title: parsedData.title,
//                 description: parsedData.desc,
//                 created_at: parsedData.created_at,
//                 updated_at: parsedData.updated_at,
//             };

//             if (parsedData.dimensionTitle)
//                 transformed.dimensionTitle = parsedData.dimensionTitle;

//             if (parsedData.dimensionImage)
//                 transformed.dimensionImage = parsedData.dimensionImage;

//             if (parsedData.productTable)
//                 transformed.tableData = parsedData.productTable;

//             if (parsedData.tableExtraData)
//                 transformed.tableExtraData = parsedData.tableExtraData;

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


async getData(sectionType: string, id?: number, category?: string): Promise<any> {
    try {
        // Don't normalize - keep original sectionType
        // const normalizedSectionType = sectionType.replace(/-/g, '');
        
        // ================= ALL SECTIONS =================
        if (sectionType === 'all') {
            const sections = ['overview', 'product-details', 'application', 'jointing-systems', 'protection-internal', 'protection-external'];

            const allData: any = {};

            for (const section of sections) {
                const response = await this.getData(section, id, category);
                allData[section] = response.data;
            }

            return {
                status: true,
                statusCode: 200,
                message: 'All sections fetched successfully',
                data: allData,
            };
        }

        // ================= SINGLE SECTION =================
        const repository = this.getRepository(sectionType); // Use original sectionType
        
        // Build where clause with category
        const whereClause: any = {};
        
        if (id) {
            whereClause.id = id;
        }
        
        // Add category filter for sections that have it
        if (category && sectionType !== 'product-details') {
            whereClause.category = category;
        }
        
        let data = null;
        
        if (id) {
            data = await repository.findOne({ where: whereClause });
        } else {
            const query: any = { take: 1 };
            if (Object.keys(whereClause).length > 0) {
                query.where = whereClause;
            }
            const records = await repository.find(query);
            data = records.length > 0 ? records[0] : null;
        }
        
        if (!data) {
            return {
                status: false,
                statusCode: 404,
                message: `${sectionType} not found${category ? ` for category: ${category}` : ''}`,
                data: null,
            };
        }

        let parsedData = this.parseJsonFields(data);

        // Handle product details transformation
        if (sectionType === 'product-details') {
            const transformed: any = {
                id: parsedData.id,
                title: parsedData.title,
                description: parsedData.desc,
                created_at: parsedData.created_at,
                updated_at: parsedData.updated_at,
            };

            if (parsedData.dimensionTitle)
                transformed.dimensionTitle = parsedData.dimensionTitle;

            if (parsedData.dimensionImage)
                transformed.dimensionImage = parsedData.dimensionImage;

            if (parsedData.productTable)
                transformed.tableData = parsedData.productTable;

            if (parsedData.tableExtraData)
                transformed.tableExtraData = parsedData.tableExtraData;

            parsedData = transformed;
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