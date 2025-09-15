import { Controller, Get, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { ApiKeyGuard } from 'src/common/api-key.guard'; 

@UseGuards(ApiKeyGuard) 
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getHome() {
    return this.homeService.getHomeData();
  }
}
