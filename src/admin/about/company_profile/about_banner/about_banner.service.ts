import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutBanner } from '../../../../entity/company_profile_banner.entity';
import { AboutBannerDto } from '../../../../dto/company_profile_banner.dto';

@Injectable()
export class AboutBannerService {
    constructor(
        @InjectRepository(AboutBanner)
        private readonly AboutBannerRepository: Repository<AboutBanner>,
    ) {}
    

    // CREATE
    async create(createDto: AboutBannerDto) {
        try {
            const newAboutBanner = this.AboutBannerRepository.create(createDto);
            const savedAboutBanner = await this.AboutBannerRepository.save(newAboutBanner);

            return {
                status: true,
                statusCode: HttpStatus.CREATED,
                message: 'About banner created successfully',
                data: savedAboutBanner,
            };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong while creating AboutBanner',
                error: error.message,
            };
        }
    }

    // GET ALL
    async findAll() {
        const data = await this.AboutBannerRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'About banner fetched successfully' : 'No About banner found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.AboutBannerRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `About banner with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'About banner fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: AboutBannerDto) {
        const About = await this.AboutBannerRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `About banner with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.AboutBannerRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'About banner updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.AboutBannerRepository.delete(id);
        if (result.affected == 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `About banner with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'About banner deleted successfully'
        };
    }
}
