// import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AboutFeature } from '../../../../entity/company_profile_banner.entity';
// import { AboutFeatureDto } from '../../../../dto/company_profile_banner.dto';

// @Injectable()
// export class AboutFeatureService {
//     constructor(
//         @InjectRepository(AboutFeature)
//         private readonly AboutFeatureRepository: Repository<AboutFeature>,
//     ) {}
    

//     // CREATE
//     async create(createDto: AboutFeatureDto) {
//         try {
//             const newAboutFeature = this.AboutFeatureRepository.create(createDto);
//             const savedAboutFeature = await this.AboutFeatureRepository.save(newAboutFeature);

//             return {
//                 status: true,
//                 statusCode: HttpStatus.CREATED,
//                 message: 'About banner created successfully',
//                 data: savedAboutFeature,
//             };
//         } catch (error) {
//             return {
//                 status: false,
//                 statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//                 message: 'Something went wrong while creating AboutFeature',
//                 error: error.message,
//             };
//         }
//     }

//     // GET ALL
//     async findAll() {
//         const data = await this.AboutFeatureRepository.find();
//         return {
//             status: true,
//             statusCode: HttpStatus.OK,
//             message: data.length > 0 ? 'About banner fetched successfully' : 'No About banner found',
//             data,
//         };
//     }

//     // GET BY ID
//     async findById(id: number) {
//         const About = await this.AboutFeatureRepository.findOne({ where: { id } });
//         if (!About) {
//             throw new NotFoundException({
//                 status: false,
//                 statusCode: HttpStatus.NOT_FOUND,
//                 message: `About banner with ID ${id} not found`,
//             });
//         }
//         return {
//             status: true,
//             statusCode: HttpStatus.OK,
//             message: 'About banner fetched successfully',
//             data: About,
//         };
//     }

//     // UPDATE
//     async update(id: number, updateDto: AboutFeatureDto) {
//         const About = await this.AboutFeatureRepository.findOne({ where: { id } });
//         if (!About) {
//             throw new NotFoundException({
//                 status: false,
//                 statusCode: HttpStatus.NOT_FOUND,
//                 message: `About banner with ID ${id} not found`,
//             });
//         }

//         Object.assign(About, updateDto);
//         const updatedAbout = await this.AboutFeatureRepository.save(About);

//         return {
//             status: true,
//             statusCode: HttpStatus.OK,
//             message: 'About banner updated successfully',
//             data: updatedAbout,
//         };
//     }

//     // DELETE
//     async delete(id: number) {
//         const result = await this.AboutFeatureRepository.delete(id);
//         if (result.affected == 0) {
//             throw new NotFoundException({
//                 status: false,
//                 statusCode: HttpStatus.NOT_FOUND,
//                 message: `About banner with ID ${id} not found`,
//             });
//         }

//         return {
//             status: true,
//             statusCode: HttpStatus.OK,
//             message: 'About banner deleted successfully'
//         };
//     }
// }
