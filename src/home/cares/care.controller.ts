import { Controller, Post, Body, UseInterceptors, UploadedFile, Put, Param, Delete, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CareDto } from '../dto/care.dto';
import { Care } from '../entity/care.entity'
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CareService } from './care.service';
import { get } from 'http';


@Controller('home/investor')
export class CareController {
    constructor(private readonly CareService: CareService) {}
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
      @Body() data: CareDto,
    ) {
      // console.log('Saved file name:', file.filename);
        return this.CareService.createCare(data, file);
    }
    //update investor
    // @Put('update-investor/:id')
    // @UseInterceptors(
    //   FileInterceptor('file', {
    //     storage: diskStorage({
    //       destination: './uploads', 
    //       filename: (req, file, cb) => {
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //         const ext = extname(file.originalname);
    //         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    //       },
    //     }),
    //   }),
    // )
    // async updateInvestor(
    //     @Param('id') id: number,
    //     @UploadedFile() file: Express.Multer.File,
    //     @Body() data: InvestorDto,
    // ) {
    //     return this.CareService.updateInvestor(id, {
    //     ...data,
    //     });
    // }

    // //get all Investors
    // @Get()
    // async getAllInvestors() {
    //     return this.CareService.getAllInvestors();
    // }
    // //get Investor by id
    // @Get(':id')
    // async getOne(@Param('id') id: number) {
    //     return this.CareService.getInvestorById(id);
    // }
    
    // //delete Investor by id
    // @Delete(':id')
    // async delete(@Param('id') id: number) {
    //     return this.CareService.deleteInvestor(id);
    // }
}