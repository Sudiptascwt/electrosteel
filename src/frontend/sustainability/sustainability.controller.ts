import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { sustainabilityService } from './sustainability.service';

@Controller('frontend/sustainability')
export class sustainabilityController {
    constructor(private readonly sustainabilityService: sustainabilityService) {}

    // Get all office details
    @Get('sustain_ability-hero')
    async sustainAbilityHero() {
        return this.sustainabilityService.sustainAbilityHero();
    }

    @Get()
    async sustainAbilitydata(
        @Query('category') category: string,  // Required category parameter
    ) {
        return this.sustainabilityService.sustainAbilitydata(category);
    }

    @Get('jolsadhana-data')
    async jalsadhanaData() {
        return this.sustainabilityService.jalsadhanaData();
    }

    @Get('employeewelfare-data')
    async employeeWelfareData() {
        return this.sustainabilityService.employeeWelfareData();
    }
    
    @Get('external-social-support-data')
    async externalSocialSupportData() {
        return this.sustainabilityService.externalSocialSupportData();
    }

    @Get('our-commitments-data')
    async ourCommitmentsData() {
        return this.sustainabilityService.ourCommitmentsData();
    }
}
