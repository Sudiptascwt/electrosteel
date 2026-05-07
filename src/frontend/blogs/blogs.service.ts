import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Blogs } from 'src/entity/blogs.entity';

// Move DTO outside the service class (better practice)
export class BlogsResponseDto {
    id: number;
    type: string;
    category: string;
    date: string;
    title: string;
    description: string;
    image: string;
    images: string[] | string;
    slider_image: string[] | string;
    link: string;
    slug: string;
    location: string;
    subtitle: string;
    banner_title: string;
    banner_image: string;
    editor_description: string;
    slider_contet: string;
    badge: string;
    created_at: Date;
    modified_at: Date;
}

@Injectable()
export class FrontendBlogsService {
    constructor(
        @InjectRepository(Blogs)
        private readonly BlogsRepo: Repository<Blogs>,
    ) {}

    // async getBlogsData(category: string): Promise<{
    //     statusCode: number;
    //     message: string;
    //     data: BlogsResponseDto[];
    // }> {
    //     try {
    //         const blogs = await this.BlogsRepo.find({ 
    //             where: { category: category },
    //             order: { created_at: 'DESC' } // Optional: Add ordering
    //         });
            
    //         const parsedBlogs = blogs.map(blog => this.transformToResponse(blog));
            
    //         return {
    //             statusCode: 200,
    //             message: parsedBlogs.length > 0 
    //                 ? 'Blogs fetched successfully' 
    //                 : 'No blogs found',
    //             data: parsedBlogs
    //         };
    //     } catch (error) {
    //         console.error('Error fetching blogs:', error);
    //         return {
    //             statusCode: 500,
    //             message: 'Failed to fetch blogs',
    //             data: []
    //         };
    //     }
    // }

    async getBlogsData(
        category: string, 
        page: number = 1, 
        limit: number = 10,
        year?: number,
        month?: number,
        keywords?: string
    ): Promise<{
        statusCode: number;
        message: string;
        data: BlogsResponseDto[];
        pagination: any;
    }> {
        try {
            const skip = (page - 1) * limit;
            
            let blogs;
            let total;
            
            // Build query builder
            const queryBuilder = this.BlogsRepo.createQueryBuilder('blog')
                .where('blog.category = :category', { category });
            
            // Add keyword search if provided
            if (keywords && keywords.trim()) {
                const keyword = `%${keywords.trim().toLowerCase()}%`;
                queryBuilder.andWhere(
                    `(LOWER(blog.title) LIKE :keyword OR 
                    LOWER(blog.description) LIKE :keyword OR 
                    LOWER(blog.slug) LIKE :keyword OR 
                    LOWER(blog.location) LIKE :keyword OR 
                    LOWER(blog.subtitle) LIKE :keyword OR 
                    LOWER(blog.badge) LIKE :keyword OR 
                    LOWER(blog.type) LIKE :keyword)`,
                    { keyword }
                );
            }
            
            // Add date filters ONLY if both year and month are provided
            // Make them optional - don't filter by date if keywords are present
            if (year && month && !keywords) {
                const monthStr = String(month).padStart(2, '0');
                queryBuilder.andWhere('blog.date LIKE :yearMonth', { yearMonth: `${year}-${monthStr}%` });
            } else if (year && !month && !keywords) {
                queryBuilder.andWhere('blog.date LIKE :yearPattern', { yearPattern: `${year}%` });
            } else if (month && !year && !keywords) {
                const monthStr = String(month).padStart(2, '0');
                queryBuilder.andWhere('blog.date LIKE :monthPattern', { monthPattern: `%-${monthStr}%` });
            }
            
            // Get total count
            total = await queryBuilder.getCount();
            
            // Get paginated data
            blogs = await queryBuilder
                .orderBy('blog.date', 'DESC')
                .addOrderBy('blog.created_at', 'DESC')
                .skip(skip)
                .take(limit)
                .getMany();
            
            const parsedBlogs = blogs.map(blog => this.transformToResponse(blog));
            const totalPages = Math.ceil(total / limit);
            
            return {
                statusCode: 200,
                message: parsedBlogs.length > 0 ? 'Blogs fetched successfully' : 'No blogs found',
                data: parsedBlogs,
                pagination: {
                    total: total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            };
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return {
                statusCode: 500,
                message: 'Failed to fetch blogs',
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    limit: 10,
                    totalPages: 0,
                    hasNext: false,
                    hasPrev: false
                }
            };
        }
    }

    async getBlogsDataBySlug(slug: string): Promise<{
        statusCode: number;
        message: string;
        data: BlogsResponseDto[];
    }> {
        try {
            const blogs = await this.BlogsRepo.find({ 
                where: { slug: slug }
            });
            
            const parsedBlogs = blogs.map(blog => this.transformToResponse(blog));
            
            return {
                statusCode: 200,
                message: parsedBlogs.length > 0 
                    ? 'Blogs fetched successfully' 
                    : 'No blogs found',
                data: parsedBlogs
            };
        } catch (error) {
            console.error('Error fetching blog by slug:', error);
            return {
                statusCode: 500,
                message: 'Failed to fetch blog',
                data: []
            };
        }
    }

    async getBlogBySlug(slug: string): Promise<{
        statusCode: number;
        message: string;
        data: BlogsResponseDto | null;
    }> {
        try {
            const blog = await this.BlogsRepo.findOne({ 
                where: { slug: slug }
            });
            
            if (!blog) {
                return {
                    statusCode: 404,
                    message: 'Blog not found',
                    data: null
                };
            }
            
            return {
                statusCode: 200,
                message: 'Blog fetched successfully',
                data: this.transformToResponse(blog)
            };
        } catch (error) {
            console.error('Error fetching blog by slug:', error);
            return {
                statusCode: 500,
                message: 'Failed to fetch blog',
                data: null
            };
        }
    }

    private transformToResponse(blog: Blogs): BlogsResponseDto {
        const parseJsonField = (value: string): string[] => {
            if (!value) return [];
            if (Array.isArray(value)) return value;
            
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [value];
            } catch {
                // If it's not valid JSON, return as single-item array
                return [value];
            }
        };
        
        // Fix file paths (convert backslashes to forward slashes)
        const fixPath = (path: string): string => {
            if (!path) return path;
            return path.replace(/\\/g, '/');
        };
        
        return {
            id: blog.id,
            type: blog.type,
            category: blog.category,
            date: blog.date,
            title: blog.title,
            description: blog.description,
            image: fixPath(blog.image),
            images: parseJsonField(blog.images).map(fixPath),
            slider_image: parseJsonField(blog.slider_image).map(fixPath),
            link: blog.link,
            slug: blog.slug,
            location: blog.location,
            subtitle: blog.subtitle,
            banner_title: blog.banner_title,
            banner_image: fixPath(blog.banner_image),
            editor_description: blog.editor_description,
            slider_contet: blog.slider_contet,
            badge: blog.badge,
            created_at: blog.created_at,
            modified_at: blog.modified_at
        };
    }
}