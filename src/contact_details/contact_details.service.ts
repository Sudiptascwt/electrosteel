import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactDetails } from '../entity/contact_details.entity';
import { CreateContactDetailsDto, UpdateContactDetailsDto } from '../dto/contact_details.dto';
import { SocialPlatform } from 'src/entity/social_platform.entity';
import { SocialPlatformDto } from '../dto/social_platform.dto';

@Injectable()
export class ContactDetailsService {
    constructor(
        @InjectRepository(ContactDetails)
        private readonly contactDetailsRepo: Repository<ContactDetails>,
        @InjectRepository(SocialPlatform)
        private readonly socialRepo: Repository<SocialPlatform>, 
    ) {}

    // CREATE
    async create(createDto: CreateContactDetailsDto) {
        const newContact = this.contactDetailsRepo.create(createDto);
        const savedContact = await this.contactDetailsRepo.save(newContact);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Contact details created successfully',
            data: savedContact,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.contactDetailsRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Contact details fetched successfully' : 'No contact details found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const contact = await this.contactDetailsRepo.findOne({ where: { id } });
        if (!contact) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Contact details with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Contact details fetched successfully',
            data: contact,
        };
    }

    // UPDATE
    async update(id: number, updateDto: UpdateContactDetailsDto) {
        const contact = await this.contactDetailsRepo.findOne({ where: { id } });
        if (!contact) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Contact details with ID ${id} not found`,
            });
        }

        Object.assign(contact, updateDto);
        const updatedContact = await this.contactDetailsRepo.save(contact);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Contact details updated successfully',
            data: updatedContact,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.contactDetailsRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Contact details with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Contact details deleted successfully',
            data: null,
        };
    }

    async updateSocial(social_platform: SocialPlatformDto) {
        let social = await this.socialRepo.findOne({ where: {} });

        if (!social) {
            social = this.socialRepo.create(social_platform);
            const created = await this.socialRepo.save(social);

            return {
                status: true,
                statusCode: HttpStatus.CREATED,
                message: 'Social platform details created successfully',
                data: created,
            };
        }

        Object.assign(social, social_platform);
        const updated = await this.socialRepo.save(social);  

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Social platform details updated successfully',
            data: updated,
        };
    }

    async findAllSocial() {
        const data = await this.socialRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Social details fetched successfully' : 'No social details found',
            data,
        };
    }
}
