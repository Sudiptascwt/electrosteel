import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCommitteType } from '../../../entity/board_committee_type.entity';
import { BoardCommitteTypeService } from './board_committee.service';
import { BoardCommitteTypeController } from './board_committee.controller';
import { BoardCommitteDetails } from 'src/entity/board_committe_details.entity';
import { board_commitee_hero_data } from 'src/entity/board_commitee_hero_data.entity';
import { BoardCommitteData } from 'src/entity/board_commitee_data.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BoardCommitteType,BoardCommitteDetails, board_commitee_hero_data, BoardCommitteData])],
    controllers: [BoardCommitteTypeController],
    providers: [BoardCommitteTypeService],
})
export class BoardCommitteTypeModule {}
