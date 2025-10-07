import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendCsrProjectController } from './csr_projects.controller';
import { FrontendCsrProjectService } from './csr_projects.service';
import { CsrProjects } from 'src/entity/csr_projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CsrProjects])],
  controllers: [FrontendCsrProjectController],
  providers: [FrontendCsrProjectService],
})
export class FrontendCsrProjectModule {}
