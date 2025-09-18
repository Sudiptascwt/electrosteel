import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from '../../entity/blogs.entity';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Blogs])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
