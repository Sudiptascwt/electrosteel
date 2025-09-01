import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { GlobalPresenceService } from './global_presense.service';
import { GlobalPresenceDto } from '../../dto/global_presense.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/global-presence')
export class GlobalPresenseController {
  constructor(private readonly GlobalPresenceService: GlobalPresenceService) {}

  @Post('create-global-presence')
  async create(@Body() data: GlobalPresenceDto) {
    return this.GlobalPresenceService.createGlobalPresence(data);
  }

  @Put('update-global-presence/:id')
  async update(@Param('id') id: number, @Body() data: GlobalPresenceDto) {
    return this.GlobalPresenceService.updateGlobalPresence(id, data);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.GlobalPresenceService.getGlobalPresenceById(id);
  }

  @Get()
  async getAll() {
    return this.GlobalPresenceService.getAllGlobalPresence();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.GlobalPresenceService.deleteGlobalPresence(id);
  }
}
