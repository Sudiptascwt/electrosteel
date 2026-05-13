
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

    async getData(sectionType: string, id?: number): Promise<any> {
        try {

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
                        page_name: 'ductile_iron_pipes',
                    },
                });

                allData.heroSection = heroSection;

                for (const section of sections) {
                    const response = await this.getData(section, id);
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

            // Handle Application section
            if (sectionType === 'application') {
                const records = await repository.find({
                    order: { id: 'ASC' },
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: 'Application fetched successfully',
                    data: records,
                };
            }

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

            let parsedData = this.parseJsonFields(data);

            // Product details transform
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
                
                // Applications - if you have separate table
                this.applicationRepo.find({
                    where: { category: 'di_valves' }, // Add this field or use different approach
                    order: { id: 'ASC' },
                }).catch(() => []),
                
                // Jointing Systems - if you have separate table
                this.jointingSystemsRepo.find({
                    where: { category: 'di_valves' },
                    take: 1,
                }).catch(() => null),
                
                // Protection Internal
                this.protectionInternalRepo.find({
                    where: { category: 'di_valves' },
                    take: 1,
                }).catch(() => null),
                
                // Protection External
                this.protectionExternalRepo.find({
                    where: { category: 'di_valves' },
                    take: 1,
                }).catch(() => null),
            ]);

            // Parse JSON fields for protection sections if needed
            const parsedJointingSystems = jointingSystems ? this.parseJsonFields(jointingSystems) : null;
            const parsedProtectionInternal = protectionInternal ? this.parseJsonFields(protectionInternal) : null;
            const parsedProtectionExternal = protectionExternal ? this.parseJsonFields(protectionExternal) : null;

            // Return combined data
            return {
                heroSection: heroSection || null,
                overview: overview.length > 0 ? overview[0] : null,
                inSupport: inSupport,
                keyBenefits: keyBenefits,
                electrosteelValveRange: valveRange,
                applications: applications,
                jointingSystems: parsedJointingSystems,
                protectionInternal: parsedProtectionInternal,
                protectionExternal: parsedProtectionExternal,
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
                    where: { page_name: 'ductile_iron_flange_pipe' },
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
    private async getFlangeTableData(): Promise<any> {
        try {
            // Option 1: If flange table is in product_details table
            const flangeData = await this.productDetailsRepo.findOne({
                where: { 
                    category: 'ductile_iron_flange_pipe',
                }
            });
            
            if (flangeData) {
                return flangeData;
            }

            // Option 2: If you have a dedicated flange table repository
            // return await this.flangeTableRepo.findOne({ take: 1 });
            
            // Option 3: Return mock/default data if needed
            return {
                id: 1,
                title: 'Flange Table',
                tableData: [
                    { size: '80mm', diameter: '89', holes: 4, boltSize: 'M16' },
                    { size: '100mm', diameter: '108', holes: 4, boltSize: 'M16' },
                    { size: '150mm', diameter: '159', holes: 4, boltSize: 'M20' },
                ]
            };
        } catch (error) {
            console.error('Error fetching flange table:', error);
            return null;
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
                    where: { page_name: 'ductile_iron_fittings' },
                }),
                
                // Overview
                this.findProductsByCategory('DuctileIronFittingsOverview', 'true').catch(() => []),
                
                // Why Choose Electrosteel
                this.findProductsByCategory('DuctileIronFittingsWhyChooseElectrosteel', 'true').catch(() => []),
                
                // Product Details
                this.productDetailsRepo.findOne({
                    where: { category: 'ductile-iron-fittings' },
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
                    where: { category: 'rubber-products' },
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
}