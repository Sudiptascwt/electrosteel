import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { frontend_160_notice_controller } from "./160_notices.controller";
import { frontend_160_notice_service } from './160_notices.service'
import { Notices160 } from "src/entity/160_notice.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Notices160])],
    controllers: [frontend_160_notice_controller],
    providers:[frontend_160_notice_service]
})
export class frontend_160_notice_module {}