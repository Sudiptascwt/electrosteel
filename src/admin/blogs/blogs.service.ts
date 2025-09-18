import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Blogs } from 'src/entity/blogs.entity';
import { BlogsDto } from '../../dto/blogs.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs)
    private readonly BlogsRepo: Repository<Blogs>,
  ) {}

  async create(createDto: BlogsDto): Promise<Blogs> {
      const unit = this.BlogsRepo.create(createDto);
      return await this.BlogsRepo.save(unit);
  }


  async findAll(): Promise<Blogs[]> {
    return await this.BlogsRepo.find();
  }

  async findById(id: number): Promise<Blogs> {
    const unit = await this.BlogsRepo.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Blogs not found');
    return unit;
  }

  async update(id: number, updateDto: BlogsDto): Promise<Blogs> {
    const unit = await this.findById(id);
    Object.assign(unit, updateDto);
    return await this.BlogsRepo.save(unit);
  }

  async delete(id: number): Promise<void> {
    const result = await this.BlogsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Blogs not found');
    }
  }
  
  async findBlogByName(category: string): Promise<Blogs> {
    const unit = await this.BlogsRepo
        .createQueryBuilder('blog')
        .where('LOWER(blog.category) = LOWER(:category)', { category })
        .getOne();

    if (!unit) throw new NotFoundException('Blog not found');
    return unit;
  }
}
