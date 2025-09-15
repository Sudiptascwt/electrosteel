import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ContactDetailsService } from './contact_details.service';
import {
  CreateContactDetailsDto,
  UpdateContactDetailsDto,
} from '../../dto/contact_details.dto';
import { SocialPlatformDto } from '../../dto/social_platform.dto'
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller() // <-- No prefix here (important)
export class ContactDetailsController {
  constructor(
    private readonly contactDetailsService: ContactDetailsService,
  ) {}

  // ------------------ CONTACT DETAILS ROUTES ------------------

  @Post('contact-details')
  async createContact(@Body() createDto: CreateContactDetailsDto) {
    return this.contactDetailsService.create(createDto);
  }

  @Get('contact-details')
  async findAllContacts() {
    return this.contactDetailsService.findAll();
  }

  @Get('contact-details/:id')
  async findContactById(@Param('id', ParseIntPipe) id: number) {
    return this.contactDetailsService.findById(id);
  }

  @Put('contact-details/:id')
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateContactDetailsDto,
  ) {
    return this.contactDetailsService.update(id, updateDto);
  }

  @Delete('contact-details/:id')
  async deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactDetailsService.delete(id);
  }

  // ------------------ SOCIAL ROUTES ------------------

  @Post('social')
  async createSocial(@Body() social_platform: SocialPlatformDto) {
    return this.contactDetailsService.updateSocial(social_platform);
  }

  @Get('social')
  async findAllSocial() {
    return this.contactDetailsService.findAllSocial();
  }
}
