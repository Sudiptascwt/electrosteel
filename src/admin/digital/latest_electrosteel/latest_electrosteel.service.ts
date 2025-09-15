import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LatestElectrosteel } from '../../../entity/latest_electrosteel.entity';
import { LatestElectrosteelDto } from '../../../dto/latest_electrosteel.dto';

@Injectable()
export class LatestElectrosteelService {
    constructor(
        @InjectRepository(LatestElectrosteel)
        private readonly LatestElectrosteelRepository: Repository<LatestElectrosteel>,
    ) {}

    // CREATE
    async create(dto: LatestElectrosteelDto) {
        const latestElectrosteel = this.LatestElectrosteelRepository.create(dto);
        const data= await this.LatestElectrosteelRepository.save(latestElectrosteel);
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Latest electrosteel created successfully.',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.LatestElectrosteelRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'LatestElectrosteels fetched successfully' : 'No LatestElectrosteel found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const LatestElectrosteel = await this.LatestElectrosteelRepository.findOne({ where: { id } });
        if (!LatestElectrosteel) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `LatestElectrosteel with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'LatestElectrosteel fetched successfully',
            data: LatestElectrosteel,
        };
    }

    async update(id: number, updateDto: LatestElectrosteelDto) {
        const LatestElectrosteel = await this.LatestElectrosteelRepository.findOne({ where: { id } });

        if (!LatestElectrosteel) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `LatestElectrosteel with ID ${id} not found`,
            });
        }
        Object.assign(LatestElectrosteel, updateDto, {
                modified_at: new Date(),
            });
        const updatedLatestElectrosteel = await this.LatestElectrosteelRepository.save(LatestElectrosteel);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'LatestElectrosteel updated successfully',
            data: updatedLatestElectrosteel,
        };
    }

    // DELETE
    async saveOrUpdate(items: { page_meta_key: string; page_meta_value: string }[]) {
        for (const item of items) {
        const existing = await this.LatestElectrosteelRepository.findOne({
            where: { page_meta_key: item.page_meta_key },
        });

        if (existing) {
            await this.LatestElectrosteelRepository.update(existing.id, {
            page_meta_value: item.page_meta_value,
            modified_at: new Date(),
            });
        } else {
            await this.LatestElectrosteelRepository.save({
            page_meta_key: item.page_meta_key,
            page_meta_value: item.page_meta_value,
            created_at: new Date(),
            modified_at: new Date(),
            });
        }
        }
    }
    
    async delete(id: number) {
        const result = await this.LatestElectrosteelRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `LatestElectrosteel with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'LatestElectrosteel deleted successfully'
        };
    }
}
