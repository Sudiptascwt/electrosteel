import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blogs } from 'src/entity/blogs.entity';


@Injectable()
export class FrontendBlogsService {
  constructor(
    @InjectRepository(Blogs)
    private readonly BlogsRepo: Repository<Blogs>,
  ) {}

  async getBlogsData() {
    const Blogs = await this.BlogsRepo.find();
    return {
      statusCode: 200,
      message: Blogs.length > 0 
        ? 'Blogs fetched successfully' 
        : 'No blogs found',
      data: Blogs
    };
  }
}
