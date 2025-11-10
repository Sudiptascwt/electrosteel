import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrikalahasthiAppointmentletter } from '../../../../../entity/srikalahasthi_appointment_letter.entity';
import { AppointmentletterDto } from '../../../../../dto/srikalahasthi_appointment_letter.dto';

@Injectable()
export class srikalahasthi_appointment_letterService {
  constructor(
    @InjectRepository(SrikalahasthiAppointmentletter)
    private readonly srikalahasthi_appointment_letterRepo: Repository<SrikalahasthiAppointmentletter>,
  ) {}

    //////////srikalahasthi_appointment_letter pipes/////////////
    // CREATE
    async create(createDto: AppointmentletterDto) {
        const office = this.srikalahasthi_appointment_letterRepo.create(createDto);
        const data = await this.srikalahasthi_appointment_letterRepo.save(office);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'srikalahasthi_appointment_letter pipes created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.srikalahasthi_appointment_letterRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'All srikalahasthi_appointment_letter pipes fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.srikalahasthi_appointment_letterRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `srikalahasthi_appointment_letter pipes with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'srikalahasthi_appointment_letter pipe fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: AppointmentletterDto) {
        const entity = await this.srikalahasthi_appointment_letterRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `srikalahasthi_appointment_letter pipes with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.srikalahasthi_appointment_letterRepo.save(entity);
        return {
            statusCode: HttpStatus.OK,
            message: 'srikalahasthi_appointment_letter pipes updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.srikalahasthi_appointment_letterRepo.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                message: `srikalahasthi_appointment_letter pipes with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.srikalahasthi_appointment_letterRepo.remove(office);
        return {
        statusCode: HttpStatus.OK,
        message: 'srikalahasthi_appointment_letter pipes deleted successfully',
        };
    }
}
