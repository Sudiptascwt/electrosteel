import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directors } from '../../../entity/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Directors)
    private readonly directorsRepository: Repository<Directors>,
  ) {}

  // CREATE single director
  async create(body: any) {
    try {
      const { name, designation, description, profile_image, url } = body;

      // Validation
      if (!name) {
        return {
          status: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Name is required',
        };
      }

      const director = this.directorsRepository.create({
        name,
        designation,
        description,
        profile_image,
        url,
      });

      const savedDirector = await this.directorsRepository.save(director);

      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        message: 'Director created successfully',
        data: savedDirector,
      };
    } catch (error) {
      return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while creating director',
        error: error.message,
      };
    }
  }

  // CREATE multiple directors (bulk)
  async createMultiple(body: any) {
    try {
      const { directors } = body;

      if (!directors || !Array.isArray(directors) || directors.length === 0) {
        return {
          status: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Directors array is required',
        };
      }

      // Validate each director
      for (let i = 0; i < directors.length; i++) {
        if (!directors[i].name) {
          return {
            status: false,
            statusCode: HttpStatus.BAD_REQUEST,
            message: `Director at index ${i} is missing name`,
          };
        }
      }

      const directorEntities = this.directorsRepository.create(directors);
      const savedDirectors = await this.directorsRepository.save(directorEntities);

      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        message: `${savedDirectors.length} director(s) created successfully`,
        data: savedDirectors,
      };
    } catch (error) {
      return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while creating directors',
        error: error.message,
      };
    }
  }

  // GET all directors
  async findAll() {
    try {
      const directors = await this.directorsRepository.find({
        order: { id: 'ASC' },
      });

      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: directors.length > 0 ? 'Directors fetched successfully' : 'No directors found',
        data: directors,
      };
    } catch (error) {
      return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while fetching directors',
        error: error.message,
      };
    }
  }

  // GET director by ID
  async findById(id: number) {
    try {
      const director = await this.directorsRepository.findOne({
        where: { id },
      });

      if (!director) {
        return {
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Director with ID ${id} not found`,
        };
      }

      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Director fetched successfully',
        data: director,
      };
    } catch (error) {
      return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while fetching director',
        error: error.message,
      };
    }
  }

  // UPDATE director by ID
  async update(id: number, body: any) {
    try {
      const { name, designation, description, profile_image, url } = body;

      const director = await this.directorsRepository.findOne({
        where: { id },
      });

      if (!director) {
        return {
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Director with ID ${id} not found`,
        };
      }

      // Update only provided fields
      if (name !== undefined) director.name = name;
      if (designation !== undefined) director.designation = designation;
      if (description !== undefined) director.description = description;
      if (profile_image !== undefined) director.profile_image = profile_image;
      if (url !== undefined) director.url = url;

      const updatedDirector = await this.directorsRepository.save(director);

      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Director updated successfully',
        data: updatedDirector,
      };
    } catch (error) {
      return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while updating director',
        error: error.message,
      };
    }
  }

  // DELETE director by ID (soft delete - if you have status field)
  async delete(id: number) {
    try {
      const director = await this.directorsRepository.findOne({
        where: { id },
      });

      if (!director) {
        return {
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Director with ID ${id} not found`,
        };
      }

      // Soft delete - if you have status field
      // director.status = 0;
      // await this.directorsRepository.save(director);

      // Hard delete - permanent removal
      await this.directorsRepository.delete(id);

      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Director deleted successfully',
      };
    } catch (error) {
      return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while deleting director',
        error: error.message,
      };
    }
  }

  // Soft delete (set status to 0) - add status field to entity first
  async softDelete(id: number) {
    try {
      const director = await this.directorsRepository.findOne({
        where: { id },
      });

      if (!director) {
        return {
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Director with ID ${id} not found`,
        };
      }

      // @ts-ignore - add status column to entity
      director.status = 0;
      await this.directorsRepository.save(director);

      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Director soft deleted successfully',
      };
    } catch (error) {
      return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while soft deleting director',
        error: error.message,
      };
    }
  }
}