
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverviewDuctileIronPipes } from '../../entity/overview.entity';
import { ProductDetails } from '../../entity/product-details.entity';
import { Application } from '../../entity/application.entity';
import { JointingSystems } from '../../entity/jointing-systems.entity';
import { ProtectionInternal } from '../../entity/protection-internal.entity';
import { ProtectionExternal } from '../../entity/protection-external.entity';
import { AllBanner } from 'src/entity/all_page_banner_image.entity';

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
}