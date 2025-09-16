import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonBanner } from '../../entity/common_banner.entity';
import { CommonBannerDto } from '../../dto/common_banner.dto';

@Injectable()
export class CommonBannerService {
    constructor(
        @InjectRepository(CommonBanner)
        private readonly CommonBannerRepository: Repository<CommonBanner>,
    ) {}

    // CREATE
    async create(createDto: CommonBannerDto) {
        const newCommonBanner = this.CommonBannerRepository.create(createDto);
        const savedCommonBanner = await this.CommonBannerRepository.save(newCommonBanner);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Banner created successfully',
            data: savedCommonBanner,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.CommonBannerRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Banner fetched successfully' : 'Banner not found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const CommonBanner = await this.CommonBannerRepository.findOne({ where: { id } });
        if (!CommonBanner) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Banner with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Banner fetched successfully',
            data: CommonBanner,
        };
    }

    // UPDATE
    async update(id: number, updateDto: CommonBannerDto) {
        const CommonBanner = await this.CommonBannerRepository.findOne({ where: { id } });
        if (!CommonBanner) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Banner with ID ${id} not found`,
            });
        }

        Object.assign(CommonBanner, updateDto);
        const updatedCommonBanner = await this.CommonBannerRepository.save(CommonBanner);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Banner updated successfully',
            data: updatedCommonBanner,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.CommonBannerRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Banner with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Banner deleted successfully'
        };
    }

    //banner fetch by page name
    async findByPageName(pageName: string): Promise<CommonBannerDto[]> {
        return this.CommonBannerRepository.find({
        where: { page_name: pageName },
        });
    }
}
