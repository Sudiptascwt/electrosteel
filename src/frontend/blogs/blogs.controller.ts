import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FrontendBlogsService } from './blogs.service';

@Controller('frontend/blogs')
export class FrontendBlogsController {
  constructor(private readonly SubsidiariesService: FrontendBlogsService) {}

  @Get(':category')
  async getBlogsData(@Param('category') category: string){
    return this.SubsidiariesService.getBlogsData(category);
  }
}
