import { Controller, Get, UseGuards } from "@nestjs/common";
import { frontend_160_notice_service } from './160_notices.service'
import { ApiKeyGuard } from "src/common/api-key.guard";

@UseGuards(ApiKeyGuard)
@Controller()
export class frontend_160_notice_controller{
    constructor(private readonly frontend_160_notice_service: frontend_160_notice_service) {}

    //get 160 notices data
    @Get('frontend/investor/160_notices')
    async get_160_notices(){
        return this.frontend_160_notice_service.getNotices160();
    }
}