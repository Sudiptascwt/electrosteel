import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NcltMeeting } from '../../../entity/nclt_meetings.entity';
import { NcltMeetingDto } from '../../../dto/nclt_meetings.dto';
import { NcltFinalOrder } from 'src/entity/nclt_final_order.entity';
import { NcltFinalOrderDto } from 'src/dto/nclt_final_order.dto';

@Injectable()
export class NcltService {
  constructor(
    @InjectRepository(NcltMeeting)
    private readonly NcltRepo: Repository<NcltMeeting>,
    @InjectRepository(NcltFinalOrder)
    private readonly NcltFinalOrderRepo: Repository<NcltFinalOrder>,
  ) {}

    //////////Nclt meeting/////////////
    // CREATE
    async create(createDto: NcltMeetingDto) {
    if (Array.isArray(createDto.title)) {
        createDto.title = createDto.title.join(',');
    }
    if (Array.isArray(createDto.pdf)) {
        createDto.pdf = createDto.pdf.join(',');
    }

    const office = this.NcltRepo.create(createDto);
    const data = await this.NcltRepo.save(office);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'Nclt meeting created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.NcltRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'Nclt meeting fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.NcltRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Nclt meeting with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'Nclt meeting fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: NcltMeetingDto) {
        if (Array.isArray(updateDto.title)) {
            updateDto.title = updateDto.title.join(',');
        }
        if (Array.isArray(updateDto.pdf)) {
            updateDto.pdf = updateDto.pdf.join(',');
        }

        await this.NcltRepo.update(id, updateDto);

        const data = await this.NcltRepo.findOneBy({ id });
        return {
            statusCode: HttpStatus.OK,
            message: 'Nclt meeting updated successfully',
            data,
        };
    }

    // DELETE
    async delete(id: number) {
        const office = await this.NcltRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Nclt meeting with ID ${id} not found`);
        }

        await this.NcltRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'Nclt meeting deleted successfully',
        };
    }

    ///////////nclt final order////////////
    // CREATE
    async createNcltFinalOrder(createDto: NcltFinalOrderDto) {
        if (Array.isArray(createDto.title)) {
            createDto.title = createDto.title.join(',');
        }
        if (Array.isArray(createDto.pdf)) {
            createDto.pdf = createDto.pdf.join(',');
        }

        const office = this.NcltFinalOrderRepo.create(createDto);
        const data = await this.NcltFinalOrderRepo.save(office);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Nclt final order created successfully',
            data,
        };
    }

    // GET ALL
    async findAllNcltFinalOrders() {
        const data = await this.NcltFinalOrderRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All Nclt final orders fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findNcltFinalOrderById(id: number) {
        const office = await this.NcltFinalOrderRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Nclt final order with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'Nclt final order fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async updateNcltFinalOrder(id: number, updateDto: NcltFinalOrderDto) {
        if (Array.isArray(updateDto.title)) {
            updateDto.title = updateDto.title.join(',');
        }
        if (Array.isArray(updateDto.pdf)) {
            updateDto.pdf = updateDto.pdf.join(',');
        }

        await this.NcltFinalOrderRepo.update(id, updateDto);

        const data = await this.NcltFinalOrderRepo.findOneBy({ id });
        return {
            statusCode: HttpStatus.OK,
            message: 'Nclt final order updated successfully',
            data,
        };
    }

    // DELETE
    async deleteNcltFinalOrder(id: number) {
        const office = await this.NcltFinalOrderRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Nclt final order with ID ${id} not found`);
        }

        await this.NcltFinalOrderRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'Nclt final order deleted successfully',
        };
    }
}
