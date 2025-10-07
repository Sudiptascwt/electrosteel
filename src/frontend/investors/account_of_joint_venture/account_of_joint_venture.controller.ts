import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendAccountofJointVentureService } from './account_of_joint_venture.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/investor/account-of-joint-venture')
export class FrontendAccountofJointVentureController {
  constructor(private readonly AccountofJointVentureService: FrontendAccountofJointVentureService) {}

  @Get()
  async getAccountofJointVentureData() {
    return this.AccountofJointVentureService.getAccountofJointVentureData();
  }
}
