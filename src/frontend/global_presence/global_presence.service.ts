import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalPresence } from '../../entity/global_presense.entity';
import { GlobalPresenceDto } from '../../dto/global_presense.dto';
import { officeDetails } from 'src/entity/office_section.entity';
import { AllOfficeDetails } from 'src/entity/office_details.entity';

@Injectable()
export class FrontendGlobalPresenceService {
  constructor(
    @InjectRepository(GlobalPresence)
    private readonly GlobalPresenceRepo: Repository<GlobalPresence>,
    @InjectRepository(officeDetails)
    private readonly officeDetailsRepo: Repository<officeDetails>,
    @InjectRepository(AllOfficeDetails)
    private readonly AllOfficeDetailsRepo: Repository<AllOfficeDetails>,
  ) {}
    async findAll() {
        const all_global_presence = await this.GlobalPresenceRepo.find();
        console.log("all_global_presence",all_global_presence);
        return all_global_presence
    }

    async findById(id: number) {
        const global_presence = await this.GlobalPresenceRepo.findOne({where:{id}});    
        if (!global_presence) {
            throw new NotFoundException({
              status: false,
              statusCode: HttpStatus.NOT_FOUND,
              message: `Global presence with ID ${id} not found`,
            });
        }
        return global_presence;
    }

    async findOfficeDetails() {
      const office_type_details = await this.officeDetailsRepo.find(); 
      console.log("office_type_details",office_type_details);
      return office_type_details;
    }
}