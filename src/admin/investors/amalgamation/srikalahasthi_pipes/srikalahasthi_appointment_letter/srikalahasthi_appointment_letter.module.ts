import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrikalahasthiAppointmentletter } from '../../../../../entity/srikalahasthi_appointment_letter.entity';
import { srikalahasthi_appointment_letterController } from './srikalahasthi_appointment_letter.controller';
import { srikalahasthi_appointment_letterService } from './srikalahasthi_appointment_letter.service';
@Module({
  imports: [TypeOrmModule.forFeature([SrikalahasthiAppointmentletter])],
  controllers: [srikalahasthi_appointment_letterController],
  providers: [srikalahasthi_appointment_letterService],
})
export class srikalahasthi_appointment_letterModule {}
