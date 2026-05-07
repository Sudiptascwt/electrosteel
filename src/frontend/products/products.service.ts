import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverviewDuctileIronPipes } from '../../entity/overview.entity';
import { ProductDetails } from '../../entity/product-details.entity';
import { Application } from '../../entity/application.entity';
import { JointingSystems } from '../../entity/jointing-systems.entity';
import { ProtectionInternal } from '../../entity/protection-internal.entity';
import { ProtectionExternal } from '../../entity/protection-external.entity';

@Injectable()
export class frontendProductService {
    constructor(
        @InjectRepository(OverviewDuctileIronPipes)
        private overviewRepository: Repository<OverviewDuctileIronPipes>,
        @InjectRepository(ProductDetails)
        private productDetailsRepository: Repository<ProductDetails>,
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
        @InjectRepository(JointingSystems)
        private jointingSystemsRepository: Repository<JointingSystems>,
        @InjectRepository(ProtectionInternal)
        private protectionInternalRepository: Repository<ProtectionInternal>,
        @InjectRepository(ProtectionExternal)
        private protectionExternalRepository: Repository<ProtectionExternal>,
    ) {}

    async getAllSections() {
        const [overview, productDetails, application, jointingSystems, protectionInternal, protectionExternal] = await Promise.all([
            this.overviewRepository.find(),
            this.productDetailsRepository.find(),
            this.applicationRepository.find(),
            this.jointingSystemsRepository.find(),
            this.protectionInternalRepository.find(),
            this.protectionExternalRepository.find(),
        ]);

        return {
            statusCode: 200,
            data: {
                overview: this.parseOverview(overview),
                productDetails: this.parseProductDetails(productDetails),
                application: this.parseApplication(application),
                jointingSystems: this.parseJointingSystems(jointingSystems),
                protectionInternal: this.parseProtectionInternal(protectionInternal),
                protectionExternal: this.parseProtectionExternal(protectionExternal),
            },
        };
    }

    private parseOverview(data: any[]) {
        return data.map(item => ({
            id: item.id,
            title: item.title,
            desc: item.desc,
            image: item.image ? JSON.parse(item.image) : [],
            tableData: item.tableData ? JSON.parse(item.tableData) : null,
            created_at: item.created_at,
            updated_at: item.updated_at,
        }));
    }

    private parseProductDetails(data: any[]) {
        return data.map(item => ({
            id: item.id,
            title: item.title,
            desc: item.desc,
            productCode: item.productCode,
            dimensionTitle: item.dimensionTitle,
            dimensionImage: item.dimensionImage,
            tableTitle: item.tableTitle,
            productTable: item.productTable ? JSON.parse(item.productTable) : null,
            created_at: item.created_at,
            updated_at: item.updated_at,
        }));
    }

    private parseApplication(data: any[]) {
        return data.map(item => ({
            id: item.id,
            title: item.title,
            listData: item.listData ? JSON.parse(item.listData) : [],
            created_at: item.created_at,
            updated_at: item.updated_at,
        }));
    }

    private parseJointingSystems(data: any[]) {
        return data.map(item => ({
            id: item.id,
            title: item.title,
            systems: item.systems ? JSON.parse(item.systems) : [],
            created_at: item.created_at,
            updated_at: item.updated_at,
        }));
    }

    private parseProtectionInternal(data: any[]) {
        return data.map(item => ({
            id: item.id,
            title: item.title,
            table: item.table ? JSON.parse(item.table) : null,
            created_at: item.created_at,
            updated_at: item.updated_at,
        }));
    }

    private parseProtectionExternal(data: any[]) {
        return data.map(item => ({
            id: item.id,
            title: item.title,
            table: item.table ? JSON.parse(item.table) : null,
            created_at: item.created_at,
            updated_at: item.updated_at,
        }));
    }
}