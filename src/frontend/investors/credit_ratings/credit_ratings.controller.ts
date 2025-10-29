import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FrontendCreditRatingsService } from './credit_ratings.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';
import { Response } from 'express'; 
import * as path from 'path';       
import * as fs from 'fs';     

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendCreditRatingsController {
  constructor(private readonly CreditRatingsService: FrontendCreditRatingsService) {}

    //get INVESTOR RELATION DATA
    @Get('frontend/investor/credit-ratings')
    async getCreditRatingsData() {
        return this.CreditRatingsService.getCreditRatingsData();
    }

    @Get('download/:filename')
    async downloadFile(
      @Param('filename') filename: string,
      @Res() res: Response,
    ) {
      const filePath = path.join(process.cwd(), 'uploads', filename);

      if (!fs.existsSync(filePath)) {
        throw new NotFoundException(`File ${filename} not found`);
      }

      res.download(filePath, filename, (err) => {
        if (err) {
          throw new NotFoundException('Error while downloading file');
        }
      });
    }
}
