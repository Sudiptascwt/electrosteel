// ductile_iron_pipes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { frontendProductController } from './products.controller';
import { frontendProductService } from './products.service';
import { OverviewDuctileIronPipes } from '../../entity/overview.entity';
import { ProductDetails } from '../../entity/product-details.entity';
import { Application } from '../../entity/application.entity';
import { JointingSystems } from '../../entity/jointing-systems.entity';
import { ProtectionInternal } from '../../entity/protection-internal.entity';
import { ProtectionExternal } from '../../entity/protection-external.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            OverviewDuctileIronPipes,
            ProductDetails,
            Application,
            JointingSystems,
            ProtectionInternal,
            ProtectionExternal,
        ]),
    ],
    controllers: [frontendProductController],
    providers: [frontendProductService],
})
export class frontendProductModule {}