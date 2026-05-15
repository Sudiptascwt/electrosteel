import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AllCertificate } from '../../entity/all_certificates.entity';
import { AllBanner } from 'src/entity/all_page_banner_image.entity';
import { Blogs } from 'src/entity/blogs.entity';
import { AllProducts } from '../../entity/all_products.entity';
import { AllProductsDto } from '../../dto/all_products.dto';

@Injectable()
export class sustainabilityService {
    constructor(
        @InjectRepository(AllBanner)
        private readonly allBannerRepo: Repository<AllBanner>,
        @InjectRepository(Blogs)
        private readonly blogRepo: Repository<Blogs>,
        @InjectRepository(AllProducts)
        private readonly AllProductsRepo: Repository<AllProducts>,
    ) {}

    // ------------------- PIPE ART CRUD -------------------


    // GET ALL PIPE ARTS WITH DETAILS
    async sustainAbilityHero() {
        const hero =  await this.allBannerRepo.find({
        where: { page_name: 'our-commitments-page' },
        });
        return {
            heroSection:hero
        };
    }

    async sustainAbilitydata(category: string): Promise<any> {
        const sustain_ability_data = await this.blogRepo.find({
            where: { category: category }
        });
        return {
            sustain_ability_data: sustain_ability_data
        };
    } 
    async jalsadhanaData(): Promise<any> {
        try {
            const heroData = await this.AllProductsRepo.find({ where: { category: 'jal-sadhana-hero' } });
            const case2 = await this.AllProductsRepo.find({ where: { category: 'what-is-Jal-Sadhana' } });  
            const case3 = await this.blogRepo.find({
                where: { category: 'jalSevakSaman' }
            });
            const case4 = await this.blogRepo.find({
                where: { category: 'jalStuti' }
            });
            const case5 = await this.blogRepo.find({
                where: { category: 'jalManthan' }
            });
            const case6 = await this.AllProductsRepo.find({
                where: { category: 'OurJourneySectionTitle' }
            });
            const case7 = await this.blogRepo.find({
                where: { category: 'JalJourneyList' }
            });
            const case8 = await this.AllProductsRepo.find({
                where: { category: 'SustainablewaterManagement' }
            });
            const case9 = await this.blogRepo.find({
                where: { category: 'JalCaseStudies' }
            });

            // Enhanced parse function for nested JSON
            const parseIfNeeded = (data: any) => {
                if (!data) return null;
                const parsed = { ...data };
                
                // Fields that might contain JSON
                const jsonFields = [
                    'description', 'title', 'image', 'sub_title', 'box_data', 
                    'tableData', 'listData', 'slider_images', 'url', 'download_link', 
                    'video_link', 'gallery', 'images', 'banner_images'
                ];
                
                for (const field of jsonFields) {
                    if (parsed[field] && typeof parsed[field] === 'string') {
                        try {
                            parsed[field] = JSON.parse(parsed[field]);
                        } catch (e) {
                            // Not JSON, keep as is
                        }
                    }
                }
                
                return parsed;
            };

            const parseArrayIfNeeded = (items: any[]) => {
                if (!items || !Array.isArray(items)) return [];
                return items.map(item => parseIfNeeded(item));
            };

            // Special parsing for heroData to ensure slider_images is parsed
            const parsedHeroData = parseIfNeeded(heroData);
            
            // If slider_images exists, ensure it's properly formatted
            if (parsedHeroData?.slider_images && Array.isArray(parsedHeroData.slider_images)) {
                parsedHeroData.slider_images = parsedHeroData.slider_images.map((slide: any) => ({
                    img: slide.img,
                    title: slide.title ? (typeof slide.title === 'string' ? slide.title : JSON.stringify(slide.title)) : null
                }));
            }

            return {
                status: true,
                statusCode: 200,
                message: 'Jal Sadhana data fetched successfully',
                data: {
                    heroData: parsedHeroData,
                    whatIsJalSadhana: parseIfNeeded(case2),
                    jalSevakSaman: parseArrayIfNeeded(case3),
                    jalStuti: parseArrayIfNeeded(case4),
                    jalManthan: parseArrayIfNeeded(case5),
                    ourJourneySectionTitle: parseArrayIfNeeded(case6),
                    jalJourneyList: parseArrayIfNeeded(case7),
                    sustainableWaterManagement: parseArrayIfNeeded(case8),
                    jalCaseStudies: parseArrayIfNeeded(case9)
                }
            };
            
        } catch (error) {
            throw new Error(`Failed to fetch Jal Sadhana data: ${error.message}`);
        }
    }

// Shared deep parse function (add to your service)
    private deepParseJson(obj: any): any {
        if (!obj) return null;
        
        // If it's a string, try to parse it as JSON
        if (typeof obj === 'string') {
            try {
                const parsed = JSON.parse(obj);
                return this.deepParseJson(parsed);
            } catch (e) {
                return obj;
            }
        }
        
        // If it's an array, parse each item
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepParseJson(item));
        }
        
        // If it's an object, parse each value
        if (typeof obj === 'object' && obj !== null) {
            const result: any = {};
            for (const key in obj) {
                result[key] = this.deepParseJson(obj[key]);
            }
            return result;
        }
        
        return obj;
    }

    // Employee Welfare Data
    async employeeWelfareData(): Promise<any> {
            try {
                const heroData =  await this.allBannerRepo.find({
                    where: { page_name: 'employee-welfare' },
                });
                
                const workplaceThatCares = await this.blogRepo.find({ 
                    where: { category: 'employee-welfare-section1' } 
                });
                
                const caresList = await this.blogRepo.find({
                    where: { category: 'workPlaceCareListSustainability' },
                    order: { id: 'ASC' }
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: 'Employee welfare data fetched successfully',
                    data: {
                        heroData: this.deepParseJson(heroData),
                        workplaceThatCares: this.deepParseJson(workplaceThatCares),
                        caresList: this.deepParseJson(caresList)
                    }
                };
                
            } catch (error) {
                throw new Error(`Failed to fetch Employee Welfare data: ${error.message}`);
            }
    }

    // External Social Support Data
    async externalSocialSupportData(): Promise<any> {
        try {
            const heroData = await this.allBannerRepo.find({
                where: { page_name: 'external-social-support' },
            });
            
            const topSection = await this.AllProductsRepo.find({ 
                where: { category: 'employee-social-sectionunique1' } 
            });
            
            // Find all categories that contain 'external-social-support'
            const multi_section = await this.AllProductsRepo.find({ 
                where: { 
                    category: Like('external-social-support%') 
                },
                order: {
                    category: 'ASC' 
                }
            });
            
            const sectionNumbers = multi_section.map(item => {
                const match = item.category.match(/external-social-support(\d+)/);
                return match ? parseInt(match[1]) : null;
            }).filter(n => n !== null);
            
            return {
                status: true,
                statusCode: 200,
                message: 'External social support data fetched successfully',
                data: {
                    heroData: this.deepParseJson(heroData),
                    topSection: this.deepParseJson(topSection),
                    multi_section: this.deepParseJson(multi_section)
                }
            };
            
        } catch (error) {
            throw new Error(`Failed to fetch External Social Support data: ${error.message}`);
        }
    }
    // Our Commitments Data
    async ourCommitmentsData(): Promise<any> {
        try {
            const [heroData, sustainingImpactSection] = await Promise.all([
                this.allBannerRepo.find({
                    where: { page_name: 'our-commitments-page' },
                }),
                this.blogRepo.find({ 
                    where: { id:108, category: 'our-commitments-page-section1' } 
                })
            ]);

            return {
                status: true,
                statusCode: 200,
                message: 'Our commitments data fetched successfully',
                data: {
                    heroData: this.deepParseJson(heroData),
                    sustainingImpactSection: this.deepParseJson(sustainingImpactSection)
                }
            };
            
        } catch (error) {
            throw new Error(`Failed to fetch Our Commitments data: ${error.message}`);
        }
    }

}
