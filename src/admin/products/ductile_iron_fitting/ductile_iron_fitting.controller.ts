import { Controller, Get, Post, Put, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { DuctileIronFittingsService } from './ductile_iron_fitting.service';


import { DuctileIronFittingOverviewDto } from '../../../dto/ductile_iron_fitting_overview.dto';
import { DuctileIronFittingWhyChooseDto } from '../../../dto/ductile_iron_fitting_why_choose.dto';
import { DuctileIronFittingProductDetailsDto } from '../../../dto/ductile_iron_fitting_product_details.dto';
import { DuctileIronFittingFittingsRangeDto } from '../../../dto/ductile_iron_fitting_fittings_range.dto';
import { DuctileIronFittingApplicationDto } from '../../../dto/ductile_iron_fitting_application.dto';
import { DuctileIronFittingJointingSystemDto } from '../../../dto/ductile_iron_fitting_jointing_system.dto';
import { DuctileIronFittingProtectionInternalDto } from '../../../dto/ductile_iron_fitting_protection_internal.dto';
import { DuctileIronFittingProtectionExternalDto } from '../../../dto/ductile_iron_fitting_protection_external.dto';
import { DuctileIronFittingCardSectionDto } from '../../../dto/ductile_iron_fitting_card_section.dto';
import { UpdateAllDuctileIronFittingsSectionsDto } from '../../../dto/update_all_ductile_iron_fittings_sections.dto';



@Controller('ductile-iron-fittings')
export class DuctileIronFittingsController {
  constructor(private readonly service: DuctileIronFittingsService) {}

  // ==================== Overview APIs ====================
  @Get('overview')
  async getOverview() {
    return this.service.getOverview();
  }

  @Post('overview')
  @HttpCode(HttpStatus.CREATED)
  async createOverview(@Body() dto: DuctileIronFittingOverviewDto) {
    return this.service.createOverview(dto);
  }

  @Put('overview')
  async updateOverview(@Body() dto: DuctileIronFittingOverviewDto) {
    return this.service.updateOverview(dto);
  }

  // ==================== Why Choose APIs ====================
  @Get('why-choose')
  async getWhyChoose() {
    return this.service.getWhyChoose();
  }

  @Post('why-choose')
  @HttpCode(HttpStatus.CREATED)
  async createWhyChoose(@Body() dto: DuctileIronFittingWhyChooseDto) {
    return this.service.createWhyChoose(dto);
  }

  @Put('why-choose')
  async updateWhyChoose(@Body() dto: DuctileIronFittingWhyChooseDto) {
    return this.service.updateWhyChoose(dto);
  }

  // ==================== Product Details APIs ====================
  @Get('product-details')
  async getProductDetails() {
    return this.service.getProductDetails();
  }

  @Post('product-details')
  @HttpCode(HttpStatus.CREATED)
  async createProductDetails(@Body() dto: DuctileIronFittingProductDetailsDto) {
    return this.service.createProductDetails(dto);
  }

  @Put('product-details')
  async updateProductDetails(@Body() dto: DuctileIronFittingProductDetailsDto) {
    return this.service.updateProductDetails(dto);
  }

  // ==================== Fittings Range APIs ====================
  @Get('fittings-range')
  async getFittingsRange() {
    return this.service.getFittingsRange();
  }

  @Post('fittings-range')
  @HttpCode(HttpStatus.CREATED)
  async createFittingsRange(@Body() dto: DuctileIronFittingFittingsRangeDto) {
    return this.service.createFittingsRange(dto);
  }

  @Put('fittings-range')
  async updateFittingsRange(@Body() dto: DuctileIronFittingFittingsRangeDto) {
    return this.service.updateFittingsRange(dto);
  }

  // ==================== Application APIs ====================
  @Get('application')
  async getApplication() {
    return this.service.getApplication();
  }

  @Post('application')
  @HttpCode(HttpStatus.CREATED)
  async createApplication(@Body() dto: DuctileIronFittingApplicationDto) {
    return this.service.createApplication(dto);
  }

  @Put('application')
  async updateApplication(@Body() dto: DuctileIronFittingApplicationDto) {
    return this.service.updateApplication(dto);
  }

  // ==================== Jointing System APIs ====================
  @Get('jointing-systems')
  async getJointingSystems() {
    return this.service.getJointingSystems();
  }

  @Post('jointing-systems')
  @HttpCode(HttpStatus.CREATED)
  async createJointingSystems(@Body() dto: DuctileIronFittingJointingSystemDto[]) {
    return this.service.createJointingSystems(dto);
  }

  @Put('jointing-systems')
  async updateJointingSystems(@Body() dto: DuctileIronFittingJointingSystemDto[]) {
    return this.service.updateJointingSystems(dto);
  }

  // ==================== Protection Internal APIs ====================
  @Get('protection-internal')
  async getProtectionInternal() {
    return this.service.getProtectionInternal();
  }

  @Post('protection-internal')
  @HttpCode(HttpStatus.CREATED)
  async createProtectionInternal(@Body() dto: DuctileIronFittingProtectionInternalDto) {
    return this.service.createProtectionInternal(dto);
  }

  @Put('protection-internal')
  async updateProtectionInternal(@Body() dto: DuctileIronFittingProtectionInternalDto) {
    return this.service.updateProtectionInternal(dto);
  }

  // ==================== Protection External APIs ====================
  @Get('protection-external')
  async getProtectionExternal() {
    return this.service.getProtectionExternal();
  }

  @Post('protection-external')
  @HttpCode(HttpStatus.CREATED)
  async createProtectionExternal(@Body() dto: DuctileIronFittingProtectionExternalDto) {
    return this.service.createProtectionExternal(dto);
  }

  @Put('protection-external')
  async updateProtectionExternal(@Body() dto: DuctileIronFittingProtectionExternalDto) {
    return this.service.updateProtectionExternal(dto);
  }

  // ==================== Card Section APIs ====================
  @Get('card-sections')
  async getCardSections() {
    return this.service.getCardSections();
  }

  @Post('card-sections')
  @HttpCode(HttpStatus.CREATED)
  async createCardSections(@Body() dto: DuctileIronFittingCardSectionDto[]) {
    return this.service.createCardSections(dto);
  }

  @Put('card-sections')
  async updateCardSections(@Body() dto: DuctileIronFittingCardSectionDto[]) {
    return this.service.updateCardSections(dto);
  }

  // ==================== Bulk Update API ====================
  @Put('all')
  async updateAllSections(@Body() dto: UpdateAllDuctileIronFittingsSectionsDto) {
    return this.service.updateAllSections(dto);
  }
}