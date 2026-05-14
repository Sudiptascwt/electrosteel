
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverviewDuctileIronPipes } from '../../entity/overview.entity';
import { ProductDetails } from '../../entity/product-details.entity';
import { Application } from '../../entity/application.entity';
import { JointingSystems } from '../../entity/jointing-systems.entity';
import { ProtectionInternal } from '../../entity/protection-internal.entity';
import { ProtectionExternal } from '../../entity/protection-external.entity';
import { AllBanner } from 'src/entity/all_page_banner_image.entity';
import { AllProducts } from 'src/entity/all_products.entity';
import { Fac } from 'src/entity/paint_fac.entity';
import { FlangePipe } from 'src/entity/flange-pipe.entity';

@Injectable()
export class frontendProductService {
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
        @InjectRepository(AllBanner)
        private bannerRepo: Repository<AllBanner>,
        @InjectRepository(AllProducts)
        private readonly AllProductsRepo: Repository<AllProducts>,
        @InjectRepository(Fac)
        private facRepository: Repository<Fac>,
        @InjectRepository(FlangePipe)
        private flangePipeRepository: Repository<FlangePipe>,
    ) {}

    private getRepository(sectionType: string): Repository<any> {
        switch (sectionType) {
            case 'overview': return this.overviewRepo;
            case 'productDetails': return this.productDetailsRepo;
            case 'application': return this.applicationRepo;
            case 'jointingSystems': return this.jointingSystemsRepo;
            case 'protectionInternal': return this.protectionInternalRepo;
            case 'protectionExternal': return this.protectionExternalRepo;
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

    // async getData(sectionType: string, id?: number, category?: string): Promise<any> {
    // try {

    //     // ================= ALL SECTIONS =================
    //     if (sectionType === 'all') {

    //         const sections = [
    //             'overview',
    //             'productDetails',
    //             'application',
    //             'jointingSystems',
    //             'protectionInternal',
    //             'protectionExternal',
    //         ];

    //         const allData: any = {};

    //         const heroSection = await this.bannerRepo.findOne({
    //             where: {
    //                 page_name: category || 'ductile_iron_pipes',
    //             },
    //         });

    //         allData.heroSection = heroSection;

    //         for (const section of sections) {
    //             const response = await this.getData(section, id, category);
    //             allData[section] = response.data;
    //         }

    //         return {
    //             status: true,
    //             statusCode: 200,
    //             message: 'All sections fetched successfully',
    //             data: allData,
    //         };
    //     }

    //     // ================= SINGLE SECTION =================
    //     const repository = this.getRepository(sectionType);

    //     // Handle Application section - HAS category column
    //     if (sectionType === 'application') {
    //         const query: any = {
    //             order: { id: 'ASC' },
    //         };
            
    //         if (category) {
    //             query.where = { category: category };
    //         }
            
    //         const records = await repository.find(query);

    //         return {
    //             status: true,
    //             statusCode: 200,
    //             message: 'Application fetched successfully',
    //             data: records,
    //         };
    //     }

    //     // Handle Overview section - HAS category column
    //     if (sectionType === 'overview') {
    //         let data = null;
            
    //         if (id) {
    //             data = await repository.findOne({ where: { id } });
    //         } else {
    //             const query: any = { take: 1 };
    //             if (category) {
    //                 query.where = { category: category };
    //             }
    //             const records = await repository.find(query);
    //             data = records.length > 0 ? records[0] : null;
    //         }
            
    //         if (!data) {
    //             return {
    //                 status: false,
    //                 statusCode: 404,
    //                 message: `Overview not found for category: ${category}`,
    //                 data: null,
    //             };
    //         }
            
    //         let parsedData = this.parseJsonFields(data);
            
    //         return {
    //             status: true,
    //             statusCode: 200,
    //             message: 'Overview fetched successfully',
    //             data: parsedData,
    //         };
    //     }

    //     // Handle Product Details section - NO category column
    //     if (sectionType === 'productDetails') {
    //         let data = null;
            
    //         if (id) {
    //             data = await repository.findOne({ where: { id } });
    //         } else {
    //             // No category filter
    //             const records = await repository.find({ take: 1 });
    //             data = records.length > 0 ? records[0] : null;
    //         }
            
    //         if (!data) {
    //             return {
    //                 status: false,
    //                 statusCode: 404,
    //                 message: 'Product details not found',
    //                 data: null,
    //             };
    //         }
            
    //         let parsedData = this.parseJsonFields(data);
            
    //         // Transform product details
    //         const transformed: any = {
    //             id: parsedData.id,
    //             title: parsedData.title,
    //             description: parsedData.desc,
    //             created_at: parsedData.created_at,
    //             updated_at: parsedData.updated_at,
    //         };

    //         if (parsedData.dimensionTitle)
    //             transformed.dimensionTitle = parsedData.dimensionTitle;

    //         if (parsedData.dimensionImage)
    //             transformed.dimensionImage = parsedData.dimensionImage;

    //         if (parsedData.productTable)
    //             transformed.tableData = parsedData.productTable;

    //         if (parsedData.tableExtraData)
    //             transformed.tableExtraData = parsedData.tableExtraData;

    //         return {
    //             status: true,
    //             statusCode: 200,
    //             message: 'Product details fetched successfully',
    //             data: transformed,
    //         };
    //     }
    //     console.log("sectionTypesss",sectionType);
        
    //     // Handle jointingSystems, protectionInternal, protectionExternal - NO category column
    //     // These tables are product-specific (e.g., jointingSystems_ductile_iron_pipes)
    //     if (['jointingSystems', 'protectionInternal', 'protectionExternal'].includes(sectionType)) {
    //         let data = null;
            
    //         if (id) {
    //             console.log("dfgdfgfgdfgh");
                
    //             data = await repository.findOne({ where: { id } });
    //         } else {
    //             console.log("no");
    //             const query: any = { take: 1 };
    //             if (category) {
    //                 query.where = { category: category };
    //             }
    //             const records = await repository.find(query);
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
            
    //         return {
    //             status: true,
    //             statusCode: 200,
    //             message: `${sectionType} fetched successfully`,
    //             data: parsedData,
    //         };
    //     }

    //     // Default handler (should never reach here)
    //     return {
    //         status: false,
    //         statusCode: 404,
    //         message: `${sectionType} not found`,
    //         data: null,
    //     };

    // } catch (error) {
    //     throw new Error(`Failed to fetch ${sectionType}: ${error.message}`);
    // }
    // }

    async getData(sectionType: string, id?: number, category?: string): Promise<any> {
        try {
            console.log(`========== getData called ==========`);
            console.log(`sectionType: ${sectionType}`);
            console.log(`id: ${id}`);
            console.log(`category: ${category}`);

            // ================= ALL SECTIONS =================
            if (sectionType === 'all') {

                const sections = [
                    'overview',
                    'productDetails',
                    'application',
                    'jointingSystems',
                    'protectionInternal',
                    'protectionExternal',
                ];

                const allData: any = {};

                const heroSection = await this.bannerRepo.findOne({
                    where: {
                        page_name: category || 'ductile_iron_pipes',
                    },
                });

                allData.heroSection = heroSection;

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
            const repository = this.getRepository(sectionType);
            console.log(`Repository obtained for: ${sectionType}`);

            // Handle Application section
            if (sectionType === 'application') {
                const query: any = {
                    order: { id: 'ASC' },
                };
                
                if (category) {
                    query.where = { category: category };
                    console.log(`Application query with where:`, query.where);
                }
                
                const records = await repository.find(query);
                console.log(`Application records found: ${records.length}`);
                
                if (records.length === 0) {
                    console.log(`No application records found for category: ${category}`);
                    // Try to see what categories exist in the table
                    const allRecords = await repository.find({ take: 10 });
                    const existingCategories = [...new Set(allRecords.map(r => r.category))];
                    console.log(`Existing categories in application table:`, existingCategories);
                }

                return {
                    status: true,
                    statusCode: 200,
                    message: 'Application fetched successfully',
                    data: records,
                };
            }

                    // Handle Overview section
            if (sectionType === 'overview') {
                let data = null;
                
                // Build where clause based on available parameters
                const whereClause: any = {};
                
                if (id) {
                    whereClause.id = id;
                }
                
                if (category) {
                    whereClause.category = category;
                }
                
                if (id) {
                    // If ID is provided, find by ID AND category (if category exists)
                    data = await repository.findOne({ where: whereClause });
                } else {
                    // If no ID, find first record matching category
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
                        message: `Overview not found for category: ${category}`,
                        data: null,
                    };
                }
                
                let parsedData = this.parseJsonFields(data);
                
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Overview fetched successfully',
                    data: parsedData,
                };
            }

            // Handle Product Details section
            if (sectionType === 'productDetails') {
                let data = null;
                
                if (id) {
                    data = await repository.findOne({ where: { id } });
                    console.log(`ProductDetails findOne id=${id}:`, data ? 'Found' : 'Not found');
                } else {
                    const records = await repository.find({ take: 1 });
                    console.log(`ProductDetails records found: ${records.length}`);
                    data = records.length > 0 ? records[0] : null;
                }
                
                if (!data) {
                    console.log(`ProductDetails not found`);
                    return {
                        status: false,
                        statusCode: 404,
                        message: 'Product details not found',
                        data: null,
                    };
                }
                
                let parsedData = this.parseJsonFields(data);
                
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

                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product details fetched successfully',
                    data: transformed,
                };
            }
            
            // Handle jointingSystems, protectionInternal, protectionExternal
            if (['jointingSystems', 'protectionInternal', 'protectionExternal'].includes(sectionType)) {
                let data = null;
                
                console.log(`Processing ${sectionType} with category: ${category}`);
                
                if (id) {
                    const whereClause: any = { id: id };
                    if (category) {
                        whereClause.category = category;
                    }
                    console.log(`${sectionType} findOne where:`, whereClause);
                    data = await repository.findOne({ where: whereClause });
                    console.log(`${sectionType} data found by ID:`, data ? 'Yes' : 'No');
                } else {
                    const query: any = { take: 1 };
                    if (category) {
                        query.where = { category: category };
                        console.log(`${sectionType} query with where:`, query.where);
                    } else {
                        console.log(`${sectionType} query without category filter`);
                    }
                    const records = await repository.find(query);
                    console.log(`${sectionType} records found: ${records.length}`);
                    if (records.length > 0) {
                        console.log(`${sectionType} first record category:`, records[0].category);
                    }
                    data = records.length > 0 ? records[0] : null;
                }
                
                if (!data) {
                    console.log(`${sectionType} not found`);
                    // Check what actually exists in the table
                    const allRecords = await repository.find({ take: 5 });
                    console.log(`All ${sectionType} records in DB:`, allRecords.map(r => ({ id: r.id, category: r.category })));
                    return {
                        status: false,
                        statusCode: 404,
                        message: `${sectionType} not found${category ? ` for category: ${category}` : ''}`,
                        data: null,
                    };
                }
                
                let parsedData = this.parseJsonFields(data);
                
                return {
                    status: true,
                    statusCode: 200,
                    message: `${sectionType} fetched successfully`,
                    data: parsedData,
                };
            }

            return {
                status: false,
                statusCode: 404,
                message: `${sectionType} not found`,
                data: null,
            };

        } catch (error) {
            console.error(`Error in getData for ${sectionType}:`, error);
            throw new Error(`Failed to fetch ${sectionType}: ${error.message}`);
        }
    }

    async findBlogByName(category: string): Promise<AllProducts[]> {
    const formatted = category.replace(/\s+/g, '').toLowerCase(); 

    const units = await this.AllProductsRepo
        .createQueryBuilder('blog')
        .where(`
        LOWER(REPLACE(blog.category, ' ', '')) = :category
        `, { category: formatted })
        .getMany();  

    if (!units || units.length === 0) {
        throw new NotFoundException('Productsnot found');
    }

    return units.map(unit => {
        if (unit.slider_images && typeof unit.slider_images === 'string') {
        try {
            unit.slider_images = JSON.parse(unit.slider_images);
        } catch (e) {}
        }
        return unit;
    });
    }

    async findProductsByCategory(category: string, exact?: string): Promise<AllProducts[]> {
        const formattedCategory = category.replace(/\s+/g, '').toLowerCase();
        
        let data: AllProducts[];
        
        if (exact === 'true') {
            // Exact match
            data = await this.AllProductsRepo
                .createQueryBuilder('product')
                .where(`LOWER(REPLACE(product.category, ' ', '')) = :category`, { 
                    category: formattedCategory 
                })
                .getMany();
        } else {
            // Pattern match
            data = await this.AllProductsRepo
                .createQueryBuilder('product')
                .where(`LOWER(REPLACE(product.category, ' ', '')) LIKE :category`, { 
                    category: `${formattedCategory}%` 
                })
                .getMany();
        }
        
        if (!data || data.length === 0) {
            throw new NotFoundException(`No products found for category: ${category}`);
        }
        
        // Parse JSON fields
        return data.map(item => {
            if (item.slider_images && typeof item.slider_images === 'string') {
                try {
                    item.slider_images = JSON.parse(item.slider_images);
                } catch (e) {}
            }
            return item;
        });
    }

    // async getAllDIValvesData(): Promise<any> {
    //     try {
    //         // Fetch all sections in parallel for better performance
    //         const [
    //             heroSection,
    //             overview,
    //             inSupport,
    //             keyBenefits,
    //             valveRange,
    //             applications,
    //             jointingSystems,
    //             protectionInternal,
    //             protectionExternal,
    //         ] = await Promise.all([
    //             // Hero Section
    //             this.bannerRepo.findOne({
    //                 where: { page_name: 'di_valves' },
    //             }),
                
    //             // Overview
    //             this.findProductsByCategory('DIValvesOverview', 'true').catch(() => []),
                
    //             // In Support
    //             this.findProductsByCategory('DIValvesInSupport', 'true').catch(() => []),
                
    //             // Key Benefits
    //             this.findProductsByCategory('DIValvesKeyBenefits', 'true').catch(() => []),
                
    //             // Electrosteel Valve Range
    //             this.findProductsByCategory('DIValvesElectrosteelValveRange', 'true').catch(() => []),
                
    //             // Applications - if you have separate table
    //             this.applicationRepo.find({
    //                 where: { category: 'di_valves' }, // Add this field or use different approach
    //                 order: { id: 'ASC' },
    //             }).catch(() => []),
                
    //             // Jointing Systems - if you have separate table
    //             this.jointingSystemsRepo.find({
    //                 where: { category: 'di_valves' },
    //                 take: 1,
    //             }).catch(() => null),
                
    //             // Protection Internal
    //             this.protectionInternalRepo.find({
    //                 where: { category: 'di_valves' },
    //                 take: 1,
    //             }).catch(() => null),
                
    //             // Protection External
    //             this.protectionExternalRepo.find({
    //                 where: { category: 'di_valves' },
    //                 take: 1,
    //             }).catch(() => null),
    //         ]);

    //         // Parse JSON fields for protection sections if needed
    //         const parsedJointingSystems = jointingSystems ? this.parseJsonFields(jointingSystems) : null;
    //         const parsedProtectionInternal = protectionInternal ? this.parseJsonFields(protectionInternal) : null;
    //         const parsedProtectionExternal = protectionExternal ? this.parseJsonFields(protectionExternal) : null;

    //         // Return combined data
    //         return {
    //             heroSection: heroSection || null,
    //             overview: overview.length > 0 ? overview[0] : null,
    //             inSupport: inSupport,
    //             keyBenefits: keyBenefits,
    //             electrosteelValveRange: valveRange,
    //             applications: applications,
    //             jointingSystems: parsedJointingSystems,
    //             protectionInternal: parsedProtectionInternal,
    //             protectionExternal: parsedProtectionExternal,
    //         };

    //     } catch (error) {
    //         throw new Error(`Failed to fetch DI Valves data: ${error.message}`);
    //     }
    // }

    async getAllDIValvesData(): Promise<any> {
    try {
        // Fetch all sections in parallel for better performance
        const [
            heroSection,
            overview,
            inSupport,
            keyBenefits,
            valveRange,
            applications,
            jointingSystems,
            protectionInternal,
            protectionExternal,
            parsedDIValvesProductDetailsSection
        ] = await Promise.all([
            // Hero Section
            this.bannerRepo.findOne({
                where: { page_name: 'di_valves' },
            }),
            
            // Overview
            this.findProductsByCategory('DIValvesOverview', 'true').catch(() => []),
            
            // In Support
            this.findProductsByCategory('DIValvesInSupport', 'true').catch(() => []),
            
            // Key Benefits
            this.findProductsByCategory('DIValvesKeyBenefits', 'true').catch(() => []),
            
            // Electrosteel Valve Range
            this.findProductsByCategory('DIValvesElectrosteelValveRange', 'true').catch(() => []),
            
            // Applications
            this.applicationRepo.find({
                where: { category: 'di_valves' },
                order: { id: 'ASC' },
            }).catch(() => []),
            
            // Jointing Systems
            this.jointingSystemsRepo.findOne({
                where: { category: 'di_valves' },
            }).catch(() => null),
            
            // Protection Internal
            this.protectionInternalRepo.findOne({
                where: { category: 'di_valves' },
            }).catch(() => null),
            
            // Protection External
            this.protectionExternalRepo.findOne({
                where: { category: 'di_valves' },
            }).catch(() => null),

            // Protection External
            this.AllProductsRepo.findOne({
                where: { category: 'DIValvesProductDetailsSection' },
            }).catch(() => null),
        ]);

        // Helper function to parse array items
        const parseArrayItems = (items: any[]): any[] => {
            if (!items || !Array.isArray(items)) return [];
            return items.map(item => this.parseJsonFields(item));
        };

        // Helper function to parse single item
        const parseSingleItem = (item: any): any => {
            if (!item) return null;
            return this.parseJsonFields(item);
        };

        // Parse all sections
        const parsedHeroSection = parseSingleItem(heroSection);
        const parsedOverview = overview.length > 0 ? parseSingleItem(overview[0]) : null;
        const parsedInSupport = parseArrayItems(inSupport);
        const parsedKeyBenefits = parseArrayItems(keyBenefits);
        const parsedValveRange = parseArrayItems(valveRange);
        const parsedApplications = parseArrayItems(applications);
        const parsedJointingSystems = parseSingleItem(jointingSystems);
        const parsedProtectionInternal = parseSingleItem(protectionInternal);
        const parsedProtectionExternal = parseSingleItem(protectionExternal);
        const DIValvesProductDetailsSection = parseSingleItem(parsedDIValvesProductDetailsSection)

        // Return combined data
        return {
            heroSection: parsedHeroSection,
            overview: parsedOverview,
            inSupport: parsedInSupport,
            keyBenefits: parsedKeyBenefits,
            electrosteelValveRange: parsedValveRange,
            applications: parsedApplications,
            jointingSystems: parsedJointingSystems,
            protectionInternal: parsedProtectionInternal,
            protectionExternal: parsedProtectionExternal,
            ProductDetails: DIValvesProductDetailsSection
        };

    } catch (error) {
        throw new Error(`Failed to fetch DI Valves data: ${error.message}`);
    }
}

    async getAllCastIronPipesData(): Promise<any> {
        try {
            // Define all sections for Cast Iron Pipes
            const sections = [
                'CastIronPipesOverview',
                'CastIronPipesInSupport',
                'CastIronPipesKeyBenefits',
                'CastIronPipesProductRange',
                'CastIronPipesApplications',
                'CastIronPipesJointingSystems',
                'CastIronPipesProtectionInternal',
                'CastIronPipesProtectionExternal',
            ];

            // Fetch all sections in parallel for better performance
            const [
                heroSection,
                overview,
                inSupport,
                keyBenefits,
                productRange,
                applications,
                jointingSystems,
                protectionInternal,
                protectionExternal,
            ] = await Promise.all([
                // Hero Section
                this.bannerRepo.findOne({
                    where: { page_name: 'CastIronPipes' },
                }),
                
                // Overview
                this.findProductsByCategory('CastIronPipesOverview', 'true').catch(() => []),
                
                // In Support
                this.findProductsByCategory('CastIronPipesInSupport', 'true').catch(() => []),
                
                // Key Benefits
                this.findProductsByCategory('CastIronPipesKeyBenefits', 'true').catch(() => []),
                
                // Product Range
                this.findProductsByCategory('CastIronPipesProductRange', 'true').catch(() => []),
                
                // Applications - from application table
                this.applicationRepo.find({
                    where: { category: 'cast_iron_pipes' }, // Adjust based on your schema
                    order: { id: 'ASC' },
                }).catch(() => []),
                
                // Jointing Systems
                this.jointingSystemsRepo.find({
                    where: { category: 'cast_iron_pipes' },
                    take: 1,
                }).catch(() => null),
                
                // Protection Internal
                this.protectionInternalRepo.find({
                    where: { category: 'cast_iron_pipes' },
                    take: 1,
                }).catch(() => null),
                
                // Protection External
                this.protectionExternalRepo.find({
                    where: { category: 'cast_iron_pipes' },
                    take: 1,
                }).catch(() => null),
            ]);

            // Parse JSON fields for protection sections if needed
            const parsedJointingSystems = jointingSystems ? this.parseJsonFields(jointingSystems) : null;
            const parsedProtectionInternal = protectionInternal ? this.parseJsonFields(protectionInternal) : null;
            const parsedProtectionExternal = protectionExternal ? this.parseJsonFields(protectionExternal) : null;

            // Return combined data matching your API structure
            return {
                heroSection: heroSection || null,
                overview: overview.length > 0 ? overview[0] : null,
                inSupport: inSupport,
                keyBenefits: keyBenefits,
                productRange: productRange,
                applications: applications,
                jointingSystems: parsedJointingSystems,
                protectionInternal: parsedProtectionInternal,
                protectionExternal: parsedProtectionExternal,
            };

        } catch (error) {
            throw new Error(`Failed to fetch Cast Iron Pipes data: ${error.message}`);
        }
    }

    async getAllDuctileIronFlangePipeData(): Promise<any> {
        try {
            const [
                heroSection,
                flangeTable,
                advantages,
                applications,
            ] = await Promise.all([
                // Hero Section
                this.bannerRepo.findOne({
                    where: { page_name: 'ductile-iron-flange-pipe' },
                }),
                
                // Flange Table - from product details or dedicated table
                this.getFlangeTableData(),
                
                // Advantages - from all products table
                this.findProductsByCategory('DIFlangeAdvantages', 'true').catch(() => []),
                
                // Applications - from application table
                this.applicationRepo.find({
                    where: { category: 'DIFlangeApplication' },
                    order: { id: 'ASC' },
                }).catch(() => []),
            ]);

            // Parse flange table if it has JSON fields
            let parsedFlangeTable = flangeTable;
            if (flangeTable && flangeTable.tableData && typeof flangeTable.tableData === 'string') {
                try {
                    parsedFlangeTable = {
                        ...flangeTable,
                        tableData: JSON.parse(flangeTable.tableData)
                    };
                } catch (e) {}
            }

            // Return combined data
            return {
                heroSection: heroSection || null,
                flangeTable: parsedFlangeTable || null,
                advantages: advantages,
                applications: applications,
            };

        } catch (error) {
            throw new Error(`Failed to fetch Ductile Iron Flange Pipe data: ${error.message}`);
        }
    }

    // Helper method to get flange table data
    // private async getFlangeTableData(): Promise<any> {
    //     try {
    //         // Option 1: If flange table is in product_details table
    //         const flangeData = await this.productDetailsRepo.findOne({
    //             where: { 
    //                 category: 'ductile-iron-flange-pipe',
    //             }
    //         });
            
    //         if (flangeData) {
    //             return flangeData;
    //         }

    //         // Option 2: If you have a dedicated flange table repository
    //         // return await this.flangeTableRepo.findOne({ take: 1 });
            
    //         // Option 3: Return mock/default data if needed
    //         return {
    //             id: 1,
    //             title: 'Flange Table',
    //             tableData: [
    //                 { size: '80mm', diameter: '89', holes: 4, boltSize: 'M16' },
    //                 { size: '100mm', diameter: '108', holes: 4, boltSize: 'M16' },
    //                 { size: '150mm', diameter: '159', holes: 4, boltSize: 'M20' },
    //             ]
    //         };
    //     } catch (error) {
    //         console.error('Error fetching flange table:', error);
    //         return null;
    //     }
    // }

    // Helper method to get flange table data
    private async getFlangeTableData(): Promise<any> {
        try {
            // Use the correct repository and query
            const tableRecord = await this.flangePipeRepository.findOne({
                where: { flange_type: 'table_data' }
            });
            
            if (!tableRecord) {
                return {
                    success: true,
                    data: null,
                    message: 'No table data found',
                };
            }
            
            return {
                success: true,
                data: {
                    tableLabel: tableRecord.table_label,
                    tableNote: tableRecord.table_note,
                    tableHeaders: tableRecord.table_headers ? JSON.parse(tableRecord.table_headers) : null,
                    tableData: tableRecord.table_data ? JSON.parse(tableRecord.table_data) : null,
                },
            };
        } catch (error) {
            console.error('Error fetching flange table:', error);
            return {
                success: false,
                data: null,
                message: error.message,
            };
        }
    }

    async getAllDuctileIronFittingsData(): Promise<any> {
        try {
            const [
                heroSection,
                overview,
                whyChooseElectrosteel,
                productDetails,
                fittingsRange,
                applications,
                jointingSystem,
                protectionInternal,
                protectionExternal,
                exploreProductRange,
                gotAQuery,
            ] = await Promise.all([
                // Hero Section
                this.bannerRepo.findOne({
                    where: { page_name: 'ductile-iron-fittings' },
                }),
                
                // Overview
                this.findProductsByCategory('DuctileIronFittingsOverview', 'true').catch(() => []),
                
                // Why Choose Electrosteel
                this.findProductsByCategory('DuctileIronFittingsWhyChooseElectrosteel', 'true').catch(() => []),
                
                // Product Details
                this.AllProductsRepo.findOne({
                    where: { category: 'DuctileIronFittingsProductDetails' },
                }).catch(() => null),
                
                // Electrosteel Fittings Range
                this.findProductsByCategory('DIFittingsElectrosteelFittingsRange', 'true').catch(() => []),
                
                
                // Applications
                this.applicationRepo.find({
                    where: { category: 'ductile-iron-fittings' },
                    order: { id: 'ASC' },
                }).catch(() => []),
                
                // Jointing System
                this.jointingSystemsRepo.findOne({
                    where: { category: 'ductile-iron-fittings' },
                }).catch(() => null),
                
                // Protection Internal
                this.protectionInternalRepo.findOne({
                    where: { category: 'ductile-iron-fittings' },
                }).catch(() => null),
                
                // Protection External
                this.protectionExternalRepo.findOne({
                    where: { category: 'ductile-iron-fittings' },
                }).catch(() => null),
                
                // Explore our Product Range
                this.findProductsByCategory('DIFittingsExploreourProductRange', 'true').catch(() => []),
                
                // Got a Query?
                this.findProductsByCategory('DIFittingsGotaQuery', 'true').catch(() => []),
            ]);

            // Parse JSON fields
            const parsedProductDetails = productDetails ? this.parseJsonFields(productDetails) : null;
            const parsedJointingSystem = jointingSystem ? this.parseJsonFields(jointingSystem) : null;
            const parsedProtectionInternal = protectionInternal ? this.parseJsonFields(protectionInternal) : null;
            const parsedProtectionExternal = protectionExternal ? this.parseJsonFields(protectionExternal) : null;

            return {
                heroSection: heroSection || null,
                overview: overview.length > 0 ? overview[0] : null,
                whyChooseElectrosteel: whyChooseElectrosteel,
                productDetails: parsedProductDetails,
                electrosteelFittingsRange: fittingsRange,
                applications: applications,
                jointingSystem: parsedJointingSystem,
                protectionInternal: parsedProtectionInternal,
                protectionExternal: parsedProtectionExternal,
                exploreProductRange: exploreProductRange,
                gotAQuery: gotAQuery,
            };

        } catch (error) {
            throw new Error(`Failed to fetch Ductile Iron Fittings data: ${error.message}`);
        }
    }

    // ================= NEW: RUBBER PRODUCTS =================
    async getAllRubberProductsData(): Promise<any> {
        try {
            const [
                heroSection,
                overview,
                whyChooseElectrosteel,
                productDetails,
                benefitsAdvantages,
                productRange,
                applications,
                ourCertifications,
            ] = await Promise.all([
                // Hero Section
                this.bannerRepo.findOne({
                    where: { page_name: 'rubber_products' },
                }),
                
                // Overview
                this.findProductsByCategory('RubberProductsOverview', 'true').catch(() => []),
                
                // Why Choose Electrosteel Rubber Products?
                this.findProductsByCategory('RubberProductsWhyChooseElectrosteel', 'true').catch(() => []),
                
                // Product Details
                this.findProductsByCategory('RubberProductsProductDetails', 'true').catch(() => []),
                
                // Benefits / Advantages
                this.findProductsByCategory('RubberProductsBenefitsAdvantages', 'true').catch(() => []),
                
                // Product Range
                this.findProductsByCategory('RubberProductsProductRange', 'true').catch(() => []),
                
                // Applications
                this.applicationRepo.find({
                    where: { category: 'rubber_products' },
                    order: { id: 'ASC' },
                }).catch(() => []),
                
                // Our Certifications
                this.findProductsByCategory('RubberProductsOurCertifications', 'true').catch(() => []),
            ]);

            return {
                heroSection: heroSection || null,
                overview: overview.length > 0 ? overview[0] : null,
                whyChooseElectrosteel: whyChooseElectrosteel,
                productDetails: productDetails,
                benefitsAdvantages: benefitsAdvantages,
                productRange: productRange,
                applications: applications,
                ourCertifications: ourCertifications,
            };

        } catch (error) {
            throw new Error(`Failed to fetch Rubber Products data: ${error.message}`);
        }
    }

    // ================= NEW: OTHER PRODUCTS =================
    async getAllOtherProductsData(): Promise<any> {
        try {
            const [
                heroSection,
                finishedProducts,
                semiFinishedProducts,
                gallery1,
                gallery2,
            ] = await Promise.all([
                // Hero Section
                this.bannerRepo.findOne({
                    where: { page_name: 'otherProducts' },
                }),
                
                // Finished Products
                this.findProductsByCategory('otherProductsfinishedProduct', 'true').catch(() => []),
                
                // Semi-Finished Products
                this.findProductsByCategory('otherProductssemiFinishedProduct', 'true').catch(() => []),
                
                // Other Products Gallery 1
                this.findProductsByCategory('other-products-gallery1', 'true').catch(() => []),
                
                // Other Products Gallery 2
                this.findProductsByCategory('other-products-gallery2', 'true').catch(() => []),
            ]);

            return {
                heroSection: heroSection || null,
                finishedProducts: finishedProducts,
                semiFinishedProducts: semiFinishedProducts,
                otherProductsGallery1: gallery1,
                otherProductsGallery2: gallery2,
            };

        } catch (error) {
            throw new Error(`Failed to fetch Other Products data: ${error.message}`);
        }
    }

    async getAllPaintCategories(): Promise<any> {
        // Define all category names
        const categories = [
            'industrialPaintBusinessOverviewPaint',
            'comprehensiveProductRangePaint',
            'testPerformedForPaintsAndPrimersPaint',
            'worldClassRawMaterialsAndGlobalApprovalsPaint',
            'worldClassRnDLaboratoryPaint',
            'currentManufacturingFacilitiesPaint',
        ];

        // Fetch all categories from database
        const results = await Promise.all(
            categories.map(async (category) => {
                const data = await this.facRepository.findOne({ 
                    where: { category } 
                });
                return {
                    category,
                    data: data ? await this.parseJsonFields(data) : null
                };
            })
        );

        // Return formatted response
        return {
            industrialPaintBusinessOverview: results.find(r => r.category === 'industrialPaintBusinessOverviewPaint')?.data || null,
            comprehensiveProductRange: results.find(r => r.category === 'comprehensiveProductRangePaint')?.data || null,
            testPerformedForPaintsAndPrimers: results.find(r => r.category === 'testPerformedForPaintsAndPrimersPaint')?.data || null,
            worldClassRawMaterialsAndGlobalApprovals: results.find(r => r.category === 'worldClassRawMaterialsAndGlobalApprovalsPaint')?.data || null,
            worldClassRnDLaboratory: results.find(r => r.category === 'worldClassRnDLaboratoryPaint')?.data || null,
            currentManufacturingFacilities: results.find(r => r.category === 'currentManufacturingFacilitiesPaint')?.data || null,
        };
    }
}