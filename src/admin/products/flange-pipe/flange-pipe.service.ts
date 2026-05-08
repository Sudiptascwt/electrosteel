import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlangePipe } from '../../../entity/flange-pipe.entity';

@Injectable()
export class FlangePipeService {
  constructor(
    @InjectRepository(FlangePipe)
    private flangePipeRepository: Repository<FlangePipe>,
  ) {}

  // ==================== API 1: TABLE SECTION ====================
  async createOrUpdateTable(tableData: any): Promise<any> {
    if (!tableData) {
      throw new BadRequestException('Table data is required');
    }

    // Delete existing table data
    await this.flangePipeRepository.delete({ flange_type: 'table_data' });
    
    // Store the complete table section as JSON
    const record = await this.flangePipeRepository.save({
      flange_type: 'table_data',
      table_label: tableData.tableLabel,
      table_note: tableData.tableNote,
      table_headers: JSON.stringify(tableData.tableHeaders),
      table_data: JSON.stringify(tableData.tableData),
      is_active: true,
    });
    
    return {
      success: true,
      message: 'Table section saved successfully',
      data: record,
    };
  }

  async getTableData(): Promise<any> {
    const tableRecord = await this.flangePipeRepository.findOne({
      where: { flange_type: 'table_data' }
    });
    
    if (!tableRecord) {
      return {
        success: true,
        data: null,
        message: 'No table data found',
      };
    }
    
    return {
      success: true,
      data: {
        tableLabel: tableRecord.table_label,
        tableNote: tableRecord.table_note,
        tableHeaders: tableRecord.table_headers ? JSON.parse(tableRecord.table_headers) : null,
        tableData: tableRecord.table_data ? JSON.parse(tableRecord.table_data) : null,
      },
    };
  }

  // ==================== API 2: APPLICATION SECTION ====================
  async createOrUpdateApplication(applicationData: any): Promise<any> {
    if (!applicationData) {
      throw new BadRequestException('Application data is required');
    }

    const existingApp = await this.flangePipeRepository.findOne({
      where: { flange_type: 'application' }
    });
    
    if (existingApp) {
      existingApp.application_title = applicationData.title;
      existingApp.application_description = applicationData.desc;
      existingApp.application_image = applicationData.image;
      await this.flangePipeRepository.save(existingApp);
      return {
        success: true,
        message: 'Application section updated successfully',
        data: existingApp,
      };
    } else {
      const newApp = await this.flangePipeRepository.save({
        flange_type: 'application',
        application_title: applicationData.title,
        application_description: applicationData.desc,
        application_image: applicationData.image,
        is_active: true,
      });
      return {
        success: true,
        message: 'Application section created successfully',
        data: newApp,
      };
    }
  }

  async getApplicationData(): Promise<any> {
    const applicationRecord = await this.flangePipeRepository.findOne({
      where: { flange_type: 'application' }
    });
    
    if (!applicationRecord) {
      return {
        success: true,
        data: null,
        message: 'No application data found',
      };
    }
    
    return {
      success: true,
      data: {
        title: applicationRecord.application_title,
        desc: applicationRecord.application_description,
        image: applicationRecord.application_image,
      },
    };
  }

  // ==================== API 3: ADVANTAGE SECTION ====================
  async createOrUpdateAdvantage(advantageData: any): Promise<any> {
    if (!advantageData) {
      throw new BadRequestException('Advantage data is required');
    }

    const existingAdv = await this.flangePipeRepository.findOne({
      where: { flange_type: 'advantage' }
    });
    
    if (existingAdv) {
      existingAdv.advantage_title = advantageData.title;
      existingAdv.advantage_description = advantageData.desc;
      await this.flangePipeRepository.save(existingAdv);
      return {
        success: true,
        message: 'Advantage section updated successfully',
        data: existingAdv,
      };
    } else {
      const newAdv = await this.flangePipeRepository.save({
        flange_type: 'advantage',
        advantage_title: advantageData.title,
        advantage_description: advantageData.desc,
        is_active: true,
      });
      return {
        success: true,
        message: 'Advantage section created successfully',
        data: newAdv,
      };
    }
  }

  async getAdvantageData(): Promise<any> {
    const advantageRecord = await this.flangePipeRepository.findOne({
      where: { flange_type: 'advantage' }
    });
    
    if (!advantageRecord) {
      return {
        success: true,
        data: null,
        message: 'No advantage data found',
      };
    }
    
    return {
      success: true,
      data: {
        title: advantageRecord.advantage_title,
        desc: advantageRecord.advantage_description,
      },
    };
  }

  // ==================== GET ALL SECTIONS ====================
  async getAllSections(): Promise<any> {
    const tableData = await this.getTableData();
    const applicationData = await this.getApplicationData();
    const advantageData = await this.getAdvantageData();
    
    return {
      success: true,
      data: {
        table: tableData.data,
        application: applicationData.data,
        advantage: advantageData.data,
      },
    };
  }

  // ==================== DELETE SECTIONS ====================
  async deleteTableData(): Promise<any> {
    await this.flangePipeRepository.delete({ flange_type: 'table_data' });
    return {
      success: true,
      message: 'Table data deleted successfully',
    };
  }

  async deleteApplicationData(): Promise<any> {
    await this.flangePipeRepository.delete({ flange_type: 'application' });
    return {
      success: true,
      message: 'Application data deleted successfully',
    };
  }

  async deleteAdvantageData(): Promise<any> {
    await this.flangePipeRepository.delete({ flange_type: 'advantage' });
    return {
      success: true,
      message: 'Advantage data deleted successfully',
    };
  }
}