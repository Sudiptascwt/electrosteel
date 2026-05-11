import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Overview } from '../../../entity/ductile_iron_fitting_overview.entity';
import { WhyChoose } from '../../../entity/ductile_iron_fitting_why_choose.entity';
import { WhyChooseList } from '../../../entity/ductile_iron_fitting_why_choose_list.entity';
import { DuctileIronFittingsProductDetails } from '../../../entity/ductile_iron_fitting_product_details.entity';
import { ProductDetailsStandard } from '../../../entity/ductile_iron_fitting_product_details_standard.entity';
import { FittingsRange } from '../../../entity/ductile_iron_fitting_fittings_range.entity';
import { FittingsRangeItem } from '../../../entity/ductile_iron_fitting_fittings_range_item.entity';
import { DuctileIronFittingsApplication } from '../../../entity/ductile_iron_fitting_application.entity';
import { ApplicationColumn } from '../../../entity/ductile_iron_fitting_application_column.entity';
import { ApplicationItem } from '../../../entity/ductile_iron_fitting_application_item.entity';
import { JointingSystem } from '../../../entity/ductile_iron_fitting_jointing_system.entity';
import { DuctileIronFittingsProtectionInternal } from '../../../entity/ductile_iron_fitting_protection_internal.entity';
import { ProtectionInternalItem } from '../../../entity/ductile_iron_fitting_protection_internal_item.entity';
import { ProtectionInternalModal } from '../../../entity/ductile_iron_fitting_protection_internal_modal.entity';
import { DuctileIronFittingsProtectionExternal } from '../../../entity/ductile_iron_fitting_protection_external.entity';
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
    @InjectRepository(DuctileIronFittingsProductDetails)
    private productDetailsRepo: Repository<DuctileIronFittingsProductDetails>,
    @InjectRepository(ProductDetailsStandard)
    private productDetailsStandardRepo: Repository<ProductDetailsStandard>,
    @InjectRepository(FittingsRange)
    private fittingsRangeRepo: Repository<FittingsRange>,
    @InjectRepository(FittingsRangeItem)
    private fittingsRangeItemRepo: Repository<FittingsRangeItem>,
    @InjectRepository(DuctileIronFittingsApplication)
    private applicationRepo: Repository<DuctileIronFittingsApplication>,
    @InjectRepository(ApplicationColumn)
    private applicationColumnRepo: Repository<ApplicationColumn>,
    @InjectRepository(ApplicationItem)
    private applicationItemRepo: Repository<ApplicationItem>,
    @InjectRepository(JointingSystem)
    private jointingSystemRepo: Repository<JointingSystem>,
    @InjectRepository(DuctileIronFittingsProtectionInternal)
    private protectionInternalRepo: Repository<DuctileIronFittingsProtectionInternal>,
    @InjectRepository(ProtectionInternalItem)
    private protectionInternalItemRepo: Repository<ProtectionInternalItem>,
    @InjectRepository(ProtectionInternalModal)
    private protectionInternalModalRepo: Repository<ProtectionInternalModal>,
    @InjectRepository(DuctileIronFittingsProtectionExternal)
    private protectionExternalRepo: Repository<DuctileIronFittingsProtectionExternal>,
    @InjectRepository(ProtectionExternalItem)
    private protectionExternalItemRepo: Repository<ProtectionExternalItem>,
    @InjectRepository(ProtectionExternalModal)
    private protectionExternalModalRepo: Repository<ProtectionExternalModal>,
    @InjectRepository(CardSection)
    private cardSectionRepo: Repository<CardSection>,
  ) {}

  // ==================== Overview ====================
  async getOverview(): Promise<Overview> {
    const overview = await this.overviewRepo.findOne({ where: { id: 1 } });
    if (!overview) throw new NotFoundException('Overview not found');
    return overview;
  }

  async upsertOverview(dto: DuctileIronFittingOverviewDto): Promise<Overview> {
    let overview = await this.overviewRepo.findOne({ where: { id: 1 } });
    
    if (!overview) {
      overview = this.overviewRepo.create({ id: 1, ...dto });
    } else {
      Object.assign(overview, dto);
    }
    
    return this.overviewRepo.save(overview);
  }

  // ==================== Why Choose ====================
  async getWhyChoose(): Promise<any> {
      const whyChoose = await this.whyChooseRepo.findOne({
          where: { id: 1 },
          relations: ['lists'],
      });
      
      if (!whyChoose) {
          throw new NotFoundException('Why Choose section not found');
      }
      
      // Sort manually
      if (whyChoose.lists) {
          whyChoose.lists.sort((a, b) => a.sort_order - b.sort_order);
      }
      
      // Transform to match request format
      return {
          id: whyChoose.id,
          title: whyChoose.title,
          lists: whyChoose.lists?.map(item => item.list_item) || [],
          created_at: whyChoose.created_at,
          updated_at: whyChoose.updated_at
      };
  }

  async upsertWhyChoose(dto: DuctileIronFittingWhyChooseDto): Promise<WhyChoose> {
      let whyChoose = await this.whyChooseRepo.findOne({ where: { id: 1 } });
      
      if (!whyChoose) {
          whyChoose = this.whyChooseRepo.create({ id: 1, title: dto.title });
      } else {
          whyChoose.title = dto.title;
          await this.whyChooseRepo.save(whyChoose);
      }
      
      if (dto.lists && Array.isArray(dto.lists)) {
          await this.whyChooseListRepo.delete({ why_choose_id: 1 });
          
          const lists = dto.lists.map((item: any, index: number) => {
              // Handle string array
              if (typeof item === 'string') {
                  return this.whyChooseListRepo.create({
                      why_choose_id: 1,
                      list_item: item,
                      sort_order: index,
                  });
              }
              // Handle object array
              else if (typeof item === 'object' && item.list_item) {
                  return this.whyChooseListRepo.create({
                      why_choose_id: 1,
                      list_item: item.list_item,
                      sort_order: item.sort_order ?? index,
                  });
              }
              // Fallback
              return this.whyChooseListRepo.create({
                  why_choose_id: 1,
                  list_item: String(item),
                  sort_order: index,
              });
          });
          
          await this.whyChooseListRepo.save(lists);
      }
      
      return this.getWhyChoose();
  }
  // ==================== Product Details ====================
  async getProductDetails(): Promise<DuctileIronFittingsProductDetails> {
    const productDetails = await this.productDetailsRepo.findOne({
      where: { id: 1 },
      relations: ['standards'],
      order: { standards: { sort_order: 'ASC' } },
    });
    if (!productDetails) throw new NotFoundException('Product details not found');
    return productDetails;
  }

  async upsertProductDetails(dto: DuctileIronFittingProductDetailsDto): Promise<DuctileIronFittingsProductDetails> {
    let productDetails = await this.productDetailsRepo.findOne({ where: { id: 1 } });
    
    if (!productDetails) {
      productDetails = this.productDetailsRepo.create({ id: 1, ...dto });
    } else {
      Object.assign(productDetails, dto);
      await this.productDetailsRepo.save(productDetails);
    }
    
    // Update standards
    if (dto.standards) {
      await this.productDetailsStandardRepo.delete({ product_details_id: 1 });
      const standards = dto.standards.map((item, index) =>
        this.productDetailsStandardRepo.create({
          product_details_id: 1,
          standard_name: item.standard_name,
          sort_order: item.sort_order ?? index,
        })
      );
      await this.productDetailsStandardRepo.save(standards);
    }
    
    return this.getProductDetails();
  }

  // ==================== Fittings Range ====================
  async getFittingsRange(): Promise<FittingsRange> {
    const fittingsRange = await this.fittingsRangeRepo.findOne({
      where: { id: 1 },
      relations: ['items'],
      order: { items: { sort_order: 'ASC' } },
    });
    if (!fittingsRange) throw new NotFoundException('Fittings range not found');
    return fittingsRange;
  }

  async upsertFittingsRange(dto: DuctileIronFittingFittingsRangeDto): Promise<FittingsRange> {
    let fittingsRange = await this.fittingsRangeRepo.findOne({ where: { id: 1 } });
    
    if (!fittingsRange) {
      fittingsRange = this.fittingsRangeRepo.create({ id: 1, ...dto });
    } else {
      Object.assign(fittingsRange, dto);
      await this.fittingsRangeRepo.save(fittingsRange);
    }
    
    // Update items
    if (dto.items) {
      await this.fittingsRangeItemRepo.delete({ fittings_range_id: 1 });
      const items = dto.items.map((item, index) =>
        this.fittingsRangeItemRepo.create({
          fittings_range_id: 1,
          item_name: item.item_name,
          sort_order: item.sort_order ?? index,
        })
      );
      await this.fittingsRangeItemRepo.save(items);
    }
    
    return this.getFittingsRange();
  }

  // ==================== Application ====================
  async getApplication(): Promise<DuctileIronFittingsApplication> {
    const application = await this.applicationRepo.findOne({
      where: { id: 1 },
      relations: ['columns', 'columns.items'],
      order: {
        'columns.sort_order': 'ASC',
        'columns.items.sort_order': 'ASC'
      } as any
    });
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  async upsertApplication(dto: DuctileIronFittingApplicationDto): Promise<DuctileIronFittingsApplication> {
    let application = await this.applicationRepo.findOne({ where: { id: 1 } });
    
    if (!application) {
      application = this.applicationRepo.create({ id: 1, title: dto.title });
    } else {
      application.title = dto.title;
      await this.applicationRepo.save(application);
    }
    
    // Update columns and items
    if (dto.columns) {
      // Delete existing
      const existingColumns = await this.applicationColumnRepo.find({ where: { application_id: 1 } });
      for (const col of existingColumns) {
        await this.applicationItemRepo.delete({ application_column_id: col.id });
        await this.applicationColumnRepo.delete(col.id);
      }
      
      // Create new
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
            })
          );
          await this.applicationItemRepo.save(items);
        }
      }
    }
    
    return this.getApplication();
  }

  // ==================== Jointing System ====================
  async getJointingSystems(): Promise<JointingSystem[]> {
    return this.jointingSystemRepo.find({ order: { sort_order: 'ASC' } });
  }

  async upsertJointingSystems(dto: DuctileIronFittingJointingSystemDto[]): Promise<JointingSystem[]> {
    await this.jointingSystemRepo.clear();
    const systems = this.jointingSystemRepo.create(dto);
    return this.jointingSystemRepo.save(systems);
  }

  // ==================== Protection Internal ====================
  async getProtectionInternal(): Promise<DuctileIronFittingsProtectionInternal> {
    const protection = await this.protectionInternalRepo.findOne({
      where: { id: 1 },
      relations: ['items', 'items.modals'],
    });
    if (!protection) throw new NotFoundException('Protection Internal not found');
    return protection;
  }

  async upsertProtectionInternal(dto: DuctileIronFittingProtectionInternalDto): Promise<DuctileIronFittingsProtectionInternal> {
    let protection = await this.protectionInternalRepo.findOne({ where: { id: 1 } });
    
    if (!protection) {
      protection = this.protectionInternalRepo.create({ id: 1, title: dto.title });
    } else {
      protection.title = dto.title;
      await this.protectionInternalRepo.save(protection);
    }
    
    // Update items and modals
    if (dto.items) {
      // Delete existing
      const existingItems = await this.protectionInternalItemRepo.find({ where: { protection_internal_id: 1 } });
      for (const item of existingItems) {
        await this.protectionInternalModalRepo.delete({ protection_internal_item_id: item.id });
        await this.protectionInternalItemRepo.delete(item.id);
      }
      
      // Create new
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
            })
          );
          await this.protectionInternalModalRepo.save(modals);
        }
      }
    }
    
    return this.getProtectionInternal();
  }

  // ==================== Protection External ====================
  async getProtectionExternal(): Promise<DuctileIronFittingsProtectionExternal> {
    const protection = await this.protectionExternalRepo.findOne({
      where: { id: 1 },
      relations: ['items', 'items.modals'],
    });
    if (!protection) throw new NotFoundException('Protection External not found');
    return protection;
  }

  async upsertProtectionExternal(dto: DuctileIronFittingProtectionExternalDto): Promise<DuctileIronFittingsProtectionExternal> {
    let protection = await this.protectionExternalRepo.findOne({ where: { id: 1 } });
    
    if (!protection) {
      protection = this.protectionExternalRepo.create({ id: 1, title: dto.title });
    } else {
      protection.title = dto.title;
      await this.protectionExternalRepo.save(protection);
    }
    
    // Update items and modals
    if (dto.items) {
      // Delete existing
      const existingItems = await this.protectionExternalItemRepo.find({ where: { protection_external_id: 1 } });
      for (const item of existingItems) {
        await this.protectionExternalModalRepo.delete({ protection_external_item_id: item.id });
        await this.protectionExternalItemRepo.delete(item.id);
      }
      
      // Create new
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
            })
          );
          await this.protectionExternalModalRepo.save(modals);
        }
      }
    }
    
    return this.getProtectionExternal();
  }

  // ==================== Card Section ====================
  async getCardSections(): Promise<CardSection[]> {
    return this.cardSectionRepo.find({ order: { sort_order: 'ASC' } });
  }

  async upsertCardSections(dto: DuctileIronFittingCardSectionDto[]): Promise<CardSection[]> {
    await this.cardSectionRepo.clear();
    const cards = this.cardSectionRepo.create(dto);
    return this.cardSectionRepo.save(cards);
  }

  // ==================== Bulk Update ====================
  async updateAllSections(dto: UpdateAllDuctileIronFittingsSectionsDto): Promise<any> {
    const results: any = {};
    
    if (dto.overview) results.overview = await this.upsertOverview(dto.overview);
    if (dto.why_choose) results.why_choose = await this.upsertWhyChoose(dto.why_choose);
    if (dto.product_details) results.product_details = await this.upsertProductDetails(dto.product_details);
    if (dto.fittings_range) results.fittings_range = await this.upsertFittingsRange(dto.fittings_range);
    if (dto.application) results.application = await this.upsertApplication(dto.application);
    if (dto.jointing_systems) results.jointing_systems = await this.upsertJointingSystems(dto.jointing_systems);
    if (dto.protection_internal) results.protection_internal = await this.upsertProtectionInternal(dto.protection_internal);
    if (dto.protection_external) results.protection_external = await this.upsertProtectionExternal(dto.protection_external);
    if (dto.card_sections) results.card_sections = await this.upsertCardSections(dto.card_sections);
    
    return results;
  }
}