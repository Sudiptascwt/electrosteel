import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendBlogsService } from './blogs.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/blogs')
export class FrontendBlogsController {
  constructor(private readonly SubsidiariesService: FrontendBlogsService) {}

  @Get()
  async getBlogsData() {
    return this.SubsidiariesService.getBlogsData();
  }
}
