// src/global_presence/global_presence.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeController } from './global_presence.controller';
import { global_presenceService } from './global_presence.service';
import { globalPresence } from 'src/entity/global_presence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([globalPresence])],
  controllers: [OfficeController],
  providers: [global_presenceService],
  exports: [global_presenceService],
})
export class global_presenceModule {}