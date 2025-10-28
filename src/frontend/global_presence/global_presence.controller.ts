import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FrontendGlobalPresenceService } from './global_presence.service';
import { GlobalPresenceDto } from '../../dto/global_presense.dto';
import { ApiKeyGuard } from 'src/common/api-key.guard'; 

@UseGuards(ApiKeyGuard) 
@Controller('frontend/global-presence')
export class FrontendGlobalPresenceController {
    constructor(private readonly GlobalPresenceService: FrontendGlobalPresenceService) {}
    // GET ALL
    @Get()
    async findAll() {
        const data = await this.GlobalPresenceService.findAll();
        return {
        statusCode: HttpStatus.OK,
        message: 'All global presence fetched successfully',
        data,
        };
    }
    // GET ALL
    @Get('/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.GlobalPresenceService.findById(id);
        return {
        statusCode: HttpStatus.OK,
        message: 'Global presence fetched successfully',
        data,
        };
    }
}
