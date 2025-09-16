import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentForm } from '../../entity/employment_form.entity';
import { EmploymentFormService } from './employment_form.service';
import { EmploymentFormController } from './employment_form.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EmploymentForm])],
    controllers: [EmploymentFormController],
    providers: [EmploymentFormService],
})
export class EmploymentFormModule {}
