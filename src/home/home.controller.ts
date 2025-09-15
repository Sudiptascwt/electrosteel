import { Controller, Post, Body, UseInterceptors, UploadedFile, Put, Param, Delete, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CertificateDto } from '../dto/certificate.dto';
import { HomesService } from './home.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../role/roles.guard';
import { Roles } from '../role/roles.decorator';
import { UserRole } from '../admin/users/user.entity';



@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('homes')
export class HomesController {
    constructor(private readonly homeService: HomesService) {}
    //create cretificate for home banner
    @Post('create-certificate')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads', 
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async certification(
      @UploadedFile() file: Express.Multer.File,
      @Body() data: CertificateDto,
    ) {
      // console.log('Saved file name:', file.filename);
      return this.homeService.createCertificate({
        ...data,
        image: file?.filename, 
      });
    }

    //update certificate for home banner
    @Put('update-certificate/:id')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads', 
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async updateCertificate(
      @Param('id') id: number,
      @UploadedFile() file: Express.Multer.File,
      @Body() data: CertificateDto,
    ) {
      return this.homeService.updateCertificate(id, {
        ...data,
        image: file?.filename, 
      });
    }

    //Inactive certificate for home banner
    @Get('inactive-certificate/:id')
    async inactiveCertificate(@Param('id') id: number) {
      return this.homeService.inactiveCertificate(id);
    }

    //delete certificate for home banner
    @Delete('delete-certificate/:id')
    async deleteCertificate(@Param('id') id: number) {
      return this.homeService.deleteCertificate(id);
    }

    //get certificate for home banner
    @Get('get-certificate/:id')  
    async getCertificate(@Param('id') id: number) {
      return this.homeService.getCertificate(id);
    }
    
    //get all certificate for home banner
    @Get('get-all-certificates')  
    async getAllCertificates() {
      return this.homeService.getAllCertificates();
    }

}






