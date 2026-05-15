// src/global_presence/global_presence.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { globalPresence } from 'src/entity/global_presence.entity';

@Injectable()
export class global_presenceService {
  constructor(
    @InjectRepository(globalPresence)
    private officeRepository: Repository<globalPresence>,
  ) {}

  // New method to handle upsert with heading, sub_heading, unique_id and data array
  async upsertWithMeta(upsertDto: any): Promise<any> {
    try {
      const { unique_id, heading, sub_heading, data } = upsertDto;
      
      if (!unique_id) {
        throw new Error('unique_id is required');
      }
      
      // First, delete all existing records with this unique_id
      await this.officeRepository.delete({ unique_id });
      console.log(`Deleted existing records for unique_id: ${unique_id}`);
      
      // Create new records for each item in data array
      const createdRecords = [];
      for (const item of data) {
        const dataToSave = {
          unique_id: unique_id,
          heading: heading,
          sub_heading: sub_heading,
          title: item.title,
          direction: item.direction,
          address: item.address,
          contact: item.contact,
          map_link: item.map_link,
          city: item.city,
          phone: item.phone,
          email: item.email,
          fax: item.fax,
          website: item.website,
          contact_person: item.contact_person,
          country: item.country || 'India',
          label: item.label,
          description: item.description,
          properties: item.properties ? JSON.stringify(item.properties) : null,
          image: item.image,
          btn_link: item.btn_link,
          category: item.category,
        };
        
        const newRecord = this.officeRepository.create(dataToSave);
        const saved = await this.officeRepository.save(newRecord);
        
        // Parse JSON fields for response
        if (saved.address && typeof saved.address === 'string') {
          try { saved.address = JSON.parse(saved.address); } catch(e) {}
        }
        if (saved.contact && typeof saved.contact === 'string') {
          try { saved.contact = JSON.parse(saved.contact); } catch(e) {}
        }
        
        createdRecords.push(saved);
      }
      
      return {
        unique_id: unique_id,
        heading: heading,
        sub_heading: sub_heading,
        data: createdRecords,
        total: createdRecords.length
      };
      
    } catch (error) {
      console.error('Upsert error:', error);
      throw new Error(`Failed to upsert data: ${error.message}`);
    }
  }

  // Find by unique_id
  async findByUniqueId(unique_id: string): Promise<any> {
    const records = await this.officeRepository.find({ 
      where: { unique_id },
      order: {
        direction: 'ASC',
        city: 'ASC',
      }
    });
    
    if (!records || records.length === 0) {
      throw new NotFoundException(`Data with unique_id "${unique_id}" not found`);
    }
    
    // Get heading and sub_heading from first record (they are same for all)
    const firstRecord = records[0];
    
    // Parse JSON fields for each record
    const parsedData = records.map(record => ({
      ...record,
      address: this.parseJsonArray(record.address),
      contact: this.parseJsonArray(record.contact),
      properties: this.parseJsonObject(record.properties),
    }));
    
    return {
      unique_id: unique_id,
      heading: firstRecord.heading,
      sub_heading: firstRecord.sub_heading,
      data: parsedData,
      total: parsedData.length
    };
  }

  // Get all groups (distinct unique_ids)
  async getAllGroups(): Promise<any[]> {
    const records = await this.officeRepository.find({
      order: {
        unique_id: 'ASC',
        direction: 'ASC',
        city: 'ASC',
      }
    });
    
    // Group by unique_id
    const groupedMap = new Map();
    
    for (const record of records) {
      if (!groupedMap.has(record.unique_id)) {
        groupedMap.set(record.unique_id, {
          unique_id: record.unique_id,
          heading: record.heading,
          sub_heading: record.sub_heading,
          data: []
        });
      }
      
      const group = groupedMap.get(record.unique_id);
      group.data.push({
        ...record,
        address: this.parseJsonArray(record.address),
        contact: this.parseJsonArray(record.contact),
        properties: this.parseJsonObject(record.properties),
      });
    }
    
    return Array.from(groupedMap.values());
  }

  // Filter offices by category, direction, or unique_id
  async filterOffices(category?: string, direction?: string, unique_id?: string): Promise<any[]> {
    const whereCondition: any = {};
    
    if (category) whereCondition.category = category;
    if (direction) whereCondition.direction = direction;
    if (unique_id) whereCondition.unique_id = unique_id;
    
    const offices = await this.officeRepository.find({ 
      where: whereCondition,
      order: {
        unique_id: 'ASC',
        direction: 'ASC',
        city: 'ASC',
      }
    });
    
    if (!offices || offices.length === 0) {
      throw new NotFoundException(`No offices found with provided filters`);
    }

    return offices.map(office => ({
      ...office,
      address: this.parseJsonArray(office.address),
      contact: this.parseJsonArray(office.contact),
      properties: this.parseJsonObject(office.properties),
    }));
  }

  // Delete by unique_id
  async deleteByUniqueId(unique_id: string): Promise<void> {
    const result = await this.officeRepository.delete({ unique_id });
    if (result.affected === 0) {
      throw new NotFoundException(`Data with unique_id "${unique_id}" not found`);
    }
  }

  // Helper: Parse JSON string to array
  private parseJsonArray(jsonString: string | null): string[] {
    if (!jsonString) return [];
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [parsed];
    } catch (e) {
      return [jsonString];
    }
  }

  // Helper: Parse JSON string to object
  private parseJsonObject(jsonString: string | null): any {
    if (!jsonString) return null;
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return jsonString;
    }
  }
}