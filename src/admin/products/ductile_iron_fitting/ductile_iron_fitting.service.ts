import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Overview } from '../../../entity/ductile_iron_fitting_overview.entity';
import { WhyChoose } from '../../../entity/ductile_iron_fitting_why_choose.entity';
import { WhyChooseList } from '../../../entity/ductile_iron_fitting_why_choose_list.entity';
import { ProductDetails } from '../../../entity/ductile_iron_fitting_product_details.entity';
import { ProductDetailsStandard } from '../../../entity/ductile_iron_fitting_product_details_standard.entity';
import { FittingsRange } from '../../../entity/ductile_iron_fitting_fittings_range.entity';
import { FittingsRangeItem } from '../../../entity/ductile_iron_fitting_fittings_range_item.entity';
import { Application } from '../../../entity/application.entity';
import { ApplicationColumn } from '../../../entity/ductile_iron_fitting_application_column.entity';
import { ApplicationItem } from '../../../entity/ductile_iron_fitting_application_item.entity';
import { JointingSystem } from '../../../entity/ductile_iron_fitting_jointing_system.entity';
import { ProtectionInternal } from '../../../entity/ductile_iron_fitting_protection_internal.entity';
import { ProtectionInternalItem } from '../../../entity/ductile_iron_fitting_protection_internal_item.entity';
import { ProtectionInternalModal } from '../../../entity/ductile_iron_fitting_protection_internal_modal.entity';
import { ProtectionExternal } from '../../../entity/ductile_iron_fitting_protection_external.entity';
import { ProtectionExternalItem } from '../../../entity/ductile_iron_fitting_protection_external_item.entity';
import { ProtectionExternalModal } from '../../../entity/ductile_iron_fitting_protection_external_modal.entity';
import { CardSection } from '../../../entity/ductile_iron_fitting_card_section.entity';

// DTOs
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

@Injectable()
export class DuctileIronFittingsService {
  constructor(
    @InjectRepository(Overview)
    private overviewRepo: Repository<Overview>,
    @InjectRepository(WhyChoose)
    private whyChooseRepo: Repository<WhyChoose>,
    @InjectRepository(WhyChooseList)
    private whyChooseListRepo: Repository<WhyChooseList>,
    @InjectRepository(ProductDetails)
    private productDetailsRepo: Repository<ProductDetails>,
    @InjectRepository(ProductDetailsStandard)
    private productDetailsStandardRepo: Repository<ProductDetailsStandard>,
    @InjectRepository(FittingsRange)
    private fittingsRangeRepo: Repository<FittingsRange>,
    @InjectRepository(FittingsRangeItem)
    private fittingsRangeItemRepo: Repository<FittingsRangeItem>,
    @InjectRepository(Application)
    private applicationRepo: Repository<Application>,
    @InjectRepository(ApplicationColumn)
    private applicationColumnRepo: Repository<ApplicationColumn>,
    @InjectRepository(ApplicationItem)
    private applicationItemRepo: Repository<ApplicationItem>,
    @InjectRepository(JointingSystem)
    private jointingSystemRepo: Repository<JointingSystem>,
    @InjectRepository(ProtectionInternal)
    private protectionInternalRepo: Repository<ProtectionInternal>,
    @InjectRepository(ProtectionInternalItem)
    private protectionInternalItemRepo: Repository<ProtectionInternalItem>,
    @InjectRepository(ProtectionInternalModal)
    private protectionInternalModalRepo: Repository<ProtectionInternalModal>,
    @InjectRepository(ProtectionExternal)
    private protectionExternalRepo: Repository<ProtectionExternal>,
    @InjectRepository(ProtectionExternalItem)
    private protectionExternalItemRepo: Repository<ProtectionExternalItem>,
    @InjectRepository(ProtectionExternalModal)
    private protectionExternalModalRepo: Repository<ProtectionExternalModal>,
    @InjectRepository(CardSection)
    private cardSectionRepo: Repository<CardSection>,
  ) {}

  // ==================== Overview Methods ====================
  async getOverview(): Promise<Overview> {
    const overview = await this.overviewRepo.findOne({ where: { id: 1 } });
    if (!overview) {
      throw new NotFoundException('Overview not found');
    }
    return overview;
  }

  async createOverview(dto: DuctileIronFittingOverviewDto): Promise<Overview> {
    const existing = await this.overviewRepo.findOne({ where: { id: 1 } });
    if (existing) {
      throw new BadRequestException('Overview already exists. Use update instead.');
    }
    const overview = this.overviewRepo.create({ ...dto, id: 1 });
    return this.overviewRepo.save(overview);
  }

  async updateOverview(dto: DuctileIronFittingOverviewDto): Promise<Overview> {
    let overview = await this.overviewRepo.findOne({ where: { id: 1 } });
    if (!overview) {
      throw new NotFoundException('Overview not found');
    }
    Object.assign(overview, dto);
    return this.overviewRepo.save(overview);
  }

  // ==================== Why Choose Methods ====================
  async getWhyChoose(): Promise<any> {
    const whyChoose = await this.whyChooseRepo.findOne({
      where: { id: 1 },
      relations: ['lists'],
      order: { lists: { sort_order: 'ASC' } },
    });
    if (!whyChoose) {
      throw new NotFoundException('Why Choose section not found');
    }
    return whyChoose;
  }

  async createWhyChoose(dto: DuctileIronFittingWhyChooseDto): Promise<any> {
    const existing = await this.whyChooseRepo.findOne({ where: { id: 1 } });
    if (existing) {
      throw new BadRequestException('Why Choose section already exists. Use update instead.');
    }
    
    const whyChoose = this.whyChooseRepo.create({ title: dto.title, id: 1 });
    const saved = await this.whyChooseRepo.save(whyChoose);
    
    if (dto.lists && dto.lists.length > 0) {
      const lists = dto.lists.map((item, index) =>
        this.whyChooseListRepo.create({
          why_choose_id: saved.id,
          list_item: item.list_item,
          sort_order: item.sort_order ?? index,
        }),
      );
      await this.whyChooseListRepo.save(lists);
    }
    
    return this.getWhyChoose();
  }

  async updateWhyChoose(dto: DuctileIronFittingWhyChooseDto): Promise<any> {
    let whyChoose = await this.whyChooseRepo.findOne({ where: { id: 1 } });
    if (!whyChoose) {
      throw new NotFoundException('Why Choose section not found');
    }
    
    if (dto.title) {
      whyChoose.title = dto.title;
      await this.whyChooseRepo.save(whyChoose);
    }
    
    if (dto.lists) {
      await this.whyChooseListRepo.delete({ why_choose_id: 1 });
      const lists = dto.lists.map((item, index) =>
        this.whyChooseListRepo.create({
          why_choose_id: 1,
          list_item: item.list_item,
          sort_order: item.sort_order ?? index,
        }),
      );
      await this.whyChooseListRepo.save(lists);
    }
    
    return this.getWhyChoose();
  }

  // ==================== Product Details Methods ====================
  async getProductDetails(): Promise<any> {
    const productDetails = await this.productDetailsRepo.findOne({
      where: { id: 1 },
      relations: ['standards'],
      order: { standards: { sort_order: 'ASC' } },
    });
    if (!productDetails) {
      throw new NotFoundException('Product details not found');
    }
    return productDetails;
  }

  async createProductDetails(dto: DuctileIronFittingProductDetailsDto): Promise<any> {
    const existing = await this.productDetailsRepo.findOne({ where: { id: 1 } });
    if (existing) {
      throw new BadRequestException('Product details already exists. Use update instead.');
    }
    
    const productDetails = this.productDetailsRepo.create({ ...dto, id: 1 });
    const saved = await this.productDetailsRepo.save(productDetails);
    
    if (dto.standards && dto.standards.length > 0) {
      const standards = dto.standards.map((item, index) =>
        this.productDetailsStandardRepo.create({
          product_details_id: saved.id,
          standard_name: item.standard_name,
          sort_order: item.sort_order ?? index,
        }),
      );
      await this.productDetailsStandardRepo.save(standards);
    }
    
    return this.getProductDetails();
  }

  async updateProductDetails(dto: DuctileIronFittingProductDetailsDto): Promise<any> {
    let productDetails = await this.productDetailsRepo.findOne({ where: { id: 1 } });
    if (!productDetails) {
      throw new NotFoundException('Product details not found');
    }
    
    if (dto.title || dto.description || dto.image_url) {
      Object.assign(productDetails, dto);
      await this.productDetailsRepo.save(productDetails);
    }
    
    if (dto.standards) {
      await this.productDetailsStandardRepo.delete({ product_details_id: 1 });
      const standards = dto.standards.map((item, index) =>
        this.productDetailsStandardRepo.create({
          product_details_id: 1,
          standard_name: item.standard_name,
          sort_order: item.sort_order ?? index,
        }),
      );
      await this.productDetailsStandardRepo.save(standards);
    }
    
    return this.getProductDetails();
  }

  // ==================== Fittings Range Methods ====================
  async getFittingsRange(): Promise<any> {
    const fittingsRange = await this.fittingsRangeRepo.findOne({
      where: { id: 1 },
      relations: ['items'],
      order: { items: { sort_order: 'ASC' } },
    });
    if (!fittingsRange) {
      throw new NotFoundException('Fittings range not found');
    }
    return fittingsRange;
  }

  async createFittingsRange(dto: DuctileIronFittingFittingsRangeDto): Promise<any> {
    const existing = await this.fittingsRangeRepo.findOne({ where: { id: 1 } });
    if (existing) {
      throw new BadRequestException('Fittings range already exists. Use update instead.');
    }
    
    const fittingsRange = this.fittingsRangeRepo.create({ title: dto.title, image_url: dto.image_url, id: 1 });
    const saved = await this.fittingsRangeRepo.save(fittingsRange);
    
    if (dto.items && dto.items.length > 0) {
      const items = dto.items.map((item, index) =>
        this.fittingsRangeItemRepo.create({
          fittings_range_id: saved.id,
          item_name: item.item_name,
          sort_order: item.sort_order ?? index,
        }),
      );
      await this.fittingsRangeItemRepo.save(items);
    }
    
    return this.getFittingsRange();
  }

  async updateFittingsRange(dto: DuctileIronFittingFittingsRangeDto): Promise<any> {
    let fittingsRange = await this.fittingsRangeRepo.findOne({ where: { id: 1 } });
    if (!fittingsRange) {
      throw new NotFoundException('Fittings range not found');
    }
    
    if (dto.title || dto.image_url) {
      Object.assign(fittingsRange, dto);
      await this.fittingsRangeRepo.save(fittingsRange);
    }
    
    if (dto.items) {
      await this.fittingsRangeItemRepo.delete({ fittings_range_id: 1 });
      const items = dto.items.map((item, index) =>
        this.fittingsRangeItemRepo.create({
          fittings_range_id: 1,
          item_name: item.item_name,
          sort_order: item.sort_order ?? index,
        }),
      );
      await this.fittingsRangeItemRepo.save(items);
    }
    
    return this.getFittingsRange();
  }

  // ==================== Application Methods ====================
  async getApplication(): Promise<any> {
    const application = await this.applicationRepo.findOne({
      where: { id: 1 },
      relations: ['columns', 'columns.items'],
      order: {
        'columns.sort_order': 'ASC',
        'columns.items.sort_order': 'ASC'
      } as any
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  async createApplication(dto: DuctileIronFittingApplicationDto): Promise<any> {
    const existing = await this.applicationRepo.findOne({ where: { id: 1 } });
    if (existing) {
      throw new BadRequestException('Application already exists. Use update instead.');
    }
    
    const application = this.applicationRepo.create({ title: dto.title, id: 1 });
    const saved = await this.applicationRepo.save(application);
    
    if (dto.columns && dto.columns.length > 0) {
      for (const col of dto.columns) {
        const column = this.applicationColumnRepo.create({
          application_id: saved.id,
          column_index: col.column_index,
          sort_order: col.sort_order ?? col.column_index,
        });
        const savedColumn = await this.applicationColumnRepo.save(column);
        
        if (col.items && col.items.length > 0) {
          const items = col.items.map((item, idx) =>
            this.applicationItemRepo.create({
              application_column_id: savedColumn.id,
              item_text: item.item_text,
              sort_order: item.sort_order ?? idx,
            }),
          );
          await this.applicationItemRepo.save(items);
        }
      }
    }
    
    return this.getApplication();
  }

  async updateApplication(dto: DuctileIronFittingApplicationDto): Promise<any> {
    let application = await this.applicationRepo.findOne({ where: { id: 1 } });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    
    if (dto.title) {
      application.title = dto.title;
      await this.applicationRepo.save(application);
    }
    
    if (dto.columns) {
      // Delete existing columns and items
      const existingColumns = await this.applicationColumnRepo.find({ where: { application_id: 1 } });
      for (const col of existingColumns) {
        await this.applicationItemRepo.delete({ application_column_id: col.id });
        await this.applicationColumnRepo.delete(col.id);
      }
      
      // Create new columns and items
      for (const col of dto.columns) {
        const column = this.applicationColumnRepo.create({
          application_id: 1,
          column_index: col.column_index,
          sort_order: col.sort_order ?? col.column_index,
        });
        const savedColumn = await this.applicationColumnRepo.save(column);
        
        if (col.items && col.items.length > 0) {
          const items = col.items.map((item, idx) =>
            this.applicationItemRepo.create({
              application_column_id: savedColumn.id,
              item_text: item.item_text,
              sort_order: item.sort_order ?? idx,
            }),
          );
          await this.applicationItemRepo.save(items);
        }
      }
    }
    
    return this.getApplication();
  }

  // ==================== Jointing System Methods ====================
  async getJointingSystems(): Promise<JointingSystem[]> {
    return this.jointingSystemRepo.find({ order: { sort_order: 'ASC' } });
  }

  async createJointingSystems(dto: DuctileIronFittingJointingSystemDto[]): Promise<JointingSystem[]> {
    const systems = this.jointingSystemRepo.create(dto);
    return this.jointingSystemRepo.save(systems);
  }

  async updateJointingSystems(dto: DuctileIronFittingJointingSystemDto[]): Promise<JointingSystem[]> {
    await this.jointingSystemRepo.clear();
    const systems = this.jointingSystemRepo.create(dto);
    return this.jointingSystemRepo.save(systems);
  }

  // ==================== Protection Internal Methods ====================
  async getProtectionInternal(): Promise<any> {
    const protection = await this.protectionInternalRepo.findOne({
      where: { id: 1 },
      relations: ['items', 'items.modals'],
    });
    
    if (!protection) {
      throw new NotFoundException('Protection Internal not found');
    }
    
    if (protection.items) {
      protection.items.sort((a, b) => a.sort_order - b.sort_order);
      protection.items.forEach(item => {
        if (item.modals) {
          item.modals.sort((a, b) => a.sort_order - b.sort_order);
        }
      });
    }
    
    return protection;
  }
  async createProtectionInternal(dto: DuctileIronFittingProtectionInternalDto): Promise<any> {
    const existing = await this.protectionInternalRepo.findOne({ where: { id: 1 } });
    if (existing) {
      throw new BadRequestException('Protection Internal already exists. Use update instead.');
    }
    
    const protection = this.protectionInternalRepo.create({ title: dto.title, id: 1 });
    const saved = await this.protectionInternalRepo.save(protection);
    
    if (dto.items && dto.items.length > 0) {
      for (const item of dto.items) {
        const protectionItem = this.protectionInternalItemRepo.create({
          protection_internal_id: saved.id,
          name: item.name,
          description: item.description,
          guiding_standards: item.guiding_standards,
          download_url: item.download_url,
          sort_order: item.sort_order ?? 0,
        });
        const savedItem = await this.protectionInternalItemRepo.save(protectionItem);
        
        if (item.modal && item.modal.length > 0) {
          const modals = item.modal.map((modal, idx) =>
            this.protectionInternalModalRepo.create({
              protection_internal_item_id: savedItem.id,
              image_url: modal.image_url,
              label: modal.label,
              description1: modal.description1,
              title: modal.title,
              description2: modal.description2,
              sort_order: modal.sort_order ?? idx,
            }),
          );
          await this.protectionInternalModalRepo.save(modals);
        }
      }
    }
    
    return this.getProtectionInternal();
  }

  async updateProtectionInternal(dto: DuctileIronFittingProtectionInternalDto): Promise<any> {
    let protection = await this.protectionInternalRepo.findOne({ where: { id: 1 } });
    if (!protection) {
      throw new NotFoundException('Protection Internal not found');
    }
    
    if (dto.title) {
      protection.title = dto.title;
      await this.protectionInternalRepo.save(protection);
    }
    
    if (dto.items) {
      // Delete existing items and modals
      const existingItems = await this.protectionInternalItemRepo.find({ where: { protection_internal_id: 1 } });
      for (const item of existingItems) {
        await this.protectionInternalModalRepo.delete({ protection_internal_item_id: item.id });
        await this.protectionInternalItemRepo.delete(item.id);
      }
      
      // Create new items and modals
      for (const item of dto.items) {
        const protectionItem = this.protectionInternalItemRepo.create({
          protection_internal_id: 1,
          name: item.name,
          description: item.description,
          guiding_standards: item.guiding_standards,
          download_url: item.download_url,
          sort_order: item.sort_order ?? 0,
        });
        const savedItem = await this.protectionInternalItemRepo.save(protectionItem);
        
        if (item.modal && item.modal.length > 0) {
          const modals = item.modal.map((modal, idx) =>
            this.protectionInternalModalRepo.create({
              protection_internal_item_id: savedItem.id,
              image_url: modal.image_url,
              label: modal.label,
              description1: modal.description1,
              title: modal.title,
              description2: modal.description2,
              sort_order: modal.sort_order ?? idx,
            }),
          );
          await this.protectionInternalModalRepo.save(modals);
        }
      }
    }
    
    return this.getProtectionInternal();
  }

  // ==================== Protection External Methods ====================
  async getProtectionExternal(): Promise<any> {
    const protection = await this.protectionExternalRepo.findOne({
      where: { id: 1 },
      relations: ['items', 'items.modals'],
    });
    
    if (!protection) {
      throw new NotFoundException('Protection External not found');
    }
    
    if (protection.items) {
      protection.items.sort((a, b) => a.sort_order - b.sort_order);
      protection.items.forEach(item => {
        if (item.modals) {
          item.modals.sort((a, b) => a.sort_order - b.sort_order);
        }
      });
    }
    
    return protection;
  }

  async createProtectionExternal(dto: DuctileIronFittingProtectionExternalDto): Promise<any> {
    const existing = await this.protectionExternalRepo.findOne({ where: { id: 1 } });
    if (existing) {
      throw new BadRequestException('Protection External already exists. Use update instead.');
    }
    
    const protection = this.protectionExternalRepo.create({ title: dto.title, id: 1 });
    const saved = await this.protectionExternalRepo.save(protection);
    
    if (dto.items && dto.items.length > 0) {
      for (const item of dto.items) {
        const protectionItem = this.protectionExternalItemRepo.create({
          protection_external_id: saved.id,
          name: item.name,
          description: item.description,
          guiding_standards: item.guiding_standards,
          sort_order: item.sort_order ?? 0,
        });
        const savedItem = await this.protectionExternalItemRepo.save(protectionItem);
        
        if (item.modal && item.modal.length > 0) {
          const modals = item.modal.map((modal, idx) =>
            this.protectionExternalModalRepo.create({
              protection_external_item_id: savedItem.id,
              label: modal.label,
              description1: modal.description1,
              sort_order: modal.sort_order ?? idx,
            }),
          );
          await this.protectionExternalModalRepo.save(modals);
        }
      }
    }
    
    return this.getProtectionExternal();
  }

  async updateProtectionExternal(dto: DuctileIronFittingProtectionExternalDto): Promise<any> {
    let protection = await this.protectionExternalRepo.findOne({ where: { id: 1 } });
    if (!protection) {
      throw new NotFoundException('Protection External not found');
    }
    
    if (dto.title) {
      protection.title = dto.title;
      await this.protectionExternalRepo.save(protection);
    }
    
    if (dto.items) {
      // Delete existing items and modals
      const existingItems = await this.protectionExternalItemRepo.find({ where: { protection_external_id: 1 } });
      for (const item of existingItems) {
        await this.protectionExternalModalRepo.delete({ protection_external_item_id: item.id });
        await this.protectionExternalItemRepo.delete(item.id);
      }
      
      // Create new items and modals
      for (const item of dto.items) {
        const protectionItem = this.protectionExternalItemRepo.create({
          protection_external_id: 1,
          name: item.name,
          description: item.description,
          guiding_standards: item.guiding_standards,
          sort_order: item.sort_order ?? 0,
        });
        const savedItem = await this.protectionExternalItemRepo.save(protectionItem);
        
        if (item.modal && item.modal.length > 0) {
          const modals = item.modal.map((modal, idx) =>
            this.protectionExternalModalRepo.create({
              protection_external_item_id: savedItem.id,
              label: modal.label,
              description1: modal.description1,
              sort_order: modal.sort_order ?? idx,
            }),
          );
          await this.protectionExternalModalRepo.save(modals);
        }
      }
    }
    
    return this.getProtectionExternal();
  }

  // ==================== Card Section Methods ====================
  async getCardSections(): Promise<CardSection[]> {
    return this.cardSectionRepo.find({ order: { sort_order: 'ASC' } });
  }

  async createCardSections(dto: DuctileIronFittingCardSectionDto[]): Promise<CardSection[]> {
    const cards = this.cardSectionRepo.create(dto);
    return this.cardSectionRepo.save(cards);
  }

  async updateCardSections(dto: DuctileIronFittingCardSectionDto[]): Promise<CardSection[]> {
    await this.cardSectionRepo.clear();
    const cards = this.cardSectionRepo.create(dto);
    return this.cardSectionRepo.save(cards);
  }

  // ==================== Bulk Update Method ====================
  async updateAllSections(dto: UpdateAllDuctileIronFittingsSectionsDto): Promise<any> {
    const results: any = {};
    
    if (dto.overview) {
      try {
        results.overview = await this.updateOverview(dto.overview);
      } catch (error) {
        results.overview = { error: error.message };
      }
    }
    
    if (dto.why_choose) {
      try {
        results.why_choose = await this.updateWhyChoose(dto.why_choose);
      } catch (error) {
        results.why_choose = { error: error.message };
      }
    }
    
    if (dto.product_details) {
      try {
        results.product_details = await this.updateProductDetails(dto.product_details);
      } catch (error) {
        results.product_details = { error: error.message };
      }
    }
    
    if (dto.fittings_range) {
      try {
        results.fittings_range = await this.updateFittingsRange(dto.fittings_range);
      } catch (error) {
        results.fittings_range = { error: error.message };
      }
    }
    
    if (dto.application) {
      try {
        results.application = await this.updateApplication(dto.application);
      } catch (error) {
        results.application = { error: error.message };
      }
    }
    
    if (dto.jointing_systems) {
      try {
        results.jointing_systems = await this.updateJointingSystems(dto.jointing_systems);
      } catch (error) {
        results.jointing_systems = { error: error.message };
      }
    }
    
    if (dto.protection_internal) {
      try {
        results.protection_internal = await this.updateProtectionInternal(dto.protection_internal);
      } catch (error) {
        results.protection_internal = { error: error.message };
      }
    }
    
    if (dto.protection_external) {
      try {
        results.protection_external = await this.updateProtectionExternal(dto.protection_external);
      } catch (error) {
        results.protection_external = { error: error.message };
      }
    }
    
    if (dto.card_sections) {
      try {
        results.card_sections = await this.updateCardSections(dto.card_sections);
      } catch (error) {
        results.card_sections = { error: error.message };
      }
    }
    
    return results;
  }
}