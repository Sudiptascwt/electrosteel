
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
}