import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsrProjects } from '../../../entity/csr_projects.entity';
import { CsrProjectsController } from './csr_projects.controller';
import { CsrProjectsService } from './csr_projects.service';
@Module({
  imports: [TypeOrmModule.forFeature([CsrProjects])],
  controllers: [CsrProjectsController],
  providers: [CsrProjectsService],
})
export class CsrProjectsModule {}