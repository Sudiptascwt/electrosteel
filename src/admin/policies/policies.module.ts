import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policies } from '../../entity/policies.entity';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Policies])],
    controllers: [PoliciesController],
    providers: [PoliciesService],
})
export class PoliciesModule {}
