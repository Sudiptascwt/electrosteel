import { Body, Controller, Post } from '@nestjs/common';
import { HomeService } from './home.service';
import { CertificateDto } from './dto/certificate.dto';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}
      @Post('createCertificate')
      async certification(@Body() data: CertificateDto) {
        return this.homeService.createCertificate(data);
      }
}


