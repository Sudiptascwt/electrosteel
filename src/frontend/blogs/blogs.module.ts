import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendBlogsController } from './blogs.controller';
import { FrontendBlogsService } from './blogs.service';
import { Blogs } from 'src/entity/blogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogs])],
  controllers: [FrontendBlogsController],
  providers: [FrontendBlogsService],
})
export class FrontendBlogsModule {}
