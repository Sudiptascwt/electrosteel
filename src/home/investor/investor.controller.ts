import { Controller, Post, Body, UseInterceptors, UploadedFile, Put, Param, Delete, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvestorDto } from '../dto/investor.dto';
import { Investor } from '../entity/investor.entity'
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InvestorService } from './investor.service';
import { get } from 'http';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/investor')
export class InvestorController {
    constructor(private readonly investorService: InvestorService) {}
    //create investor
    @Post('create-investor')
    @UseInterceptors(
      FileInterceptor('file', {
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
    async createInvestor(
      @UploadedFile() file: Express.Multer.File,
      @Body() data: InvestorDto,
    ) {
      // console.log('Saved file name:', file.filename);
        return this.investorService.createInvestor(data, file);
    }
    //update investor
    @Put('update-investor/:id')
    @UseInterceptors(
      FileInterceptor('file', {
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
    async updateInvestor(
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() data: InvestorDto,
    ) {
        return this.investorService.updateInvestor(id, {
        ...data,
        });
    }

    //get all Investors
    @Get()
    async getAllInvestors() {
        return this.investorService.getAllInvestors();
    }
    //get Investor by id
    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.investorService.getInvestorById(id);
    }
    
    //delete Investor by id
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.investorService.deleteInvestor(id);
    }
}