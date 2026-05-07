import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { AboutFrontendDto } from 'src/dto/csr_projects.dto';
// import { AboutFrontend } from 'src/entity/csr_projects.entity';
import { Repository } from 'typeorm';
import { AboutMain } from '../../entity/about_main.entity';
import { growing_strength_data } from 'src/entity/growing_strength_data.entity';
import { AboutDuctileIron } from 'src/entity/about_ductile_iron.entity';
import { ManufacturingFacilities } from 'src/entity/manufacturing_facilities.entity';
import { headings } from 'src/entity/headings.entity';
import { AboutPeopleData } from 'src/entity/about_people_data.entity';
import { about_technology_innovation } from 'src/entity/about_technology_innovation.entity';
import { Vision } from 'src/entity/vision.entity';
import { VisionPrinciples } from 'src/entity/vision_principles.entity';
import { Mission } from 'src/entity/mission.entity';
import { board_commitee_hero_data } from 'src/entity/board_commitee_hero_data.entity';
import { BoardCommitteData } from 'src/entity/board_commitee_data.entity';
import { Directors } from 'src/entity/director.entity';
import { AllPagesTitle } from 'src/entity/all_page_title.entity';
import { ProcessInnovationHero } from 'src/entity/process_innovation_hero.entity';
import { PipesToInhospitableKargil } from '../../entity/pipes_to_inhospitable_kargil.entity';
import { ElectrosteelIsro } from 'src/entity/electrosteel_isro.entity';
import { ReachingStars } from '../../entity/ReachingStars.entity';
import { ViaHelicopter } from '../../entity/ViaHelicopter.entity';
import { UltimateDIPipes } from '../../entity/UltimateDIPipes.entity';
import { changiWater } from '../../entity/changiWater.entity';
import { ProductInnovationHeroSection } from '../../entity/product_innovation_hero_section.entity';
import { ElectrolockJoint } from '../../entity/electrolock_joint.entity';
import { TrenchlessDIPipes } from '../../entity/trenchless-di-pipes.entity';
import { PolyurethaneLining } from '../../entity/polyurethane-lining.entity';
import { PolyurethaneCoating } from '../../entity/polyurethane-coating.entity';
import { LegendHeroSection } from '../../entity/legend_of_ecl_hero.entity';
import { LegendEclCard } from '../../entity/legend_ecl_cards.entity';
import { LegendEclVideo } from '../../entity/legend_ecl_video_section.entity';
import { Milestone } from 'src/entity/milestones.entity';
import { MilestoneBanner } from 'src/entity/milestone_banner.entity';
import { SectionContent } from 'src/entity/section_contents.entity';
import { Testimonial } from 'src/entity/testimonials.entity';
import { Reward } from 'src/entity/rewards.entity';
import { Blogs } from 'src/entity/blogs.entity';
import { AllBanner } from 'src/entity/all_page_banner_image.entity';
import { CommonTitle } from 'src/entity/common_titles.entity';

@Injectable()
export class AboutFrontendService {
    constructor(
    @InjectRepository(AboutMain)
    private readonly aboutMainRepository: Repository<AboutMain>,

    @InjectRepository(growing_strength_data)
    private readonly growingStrengthRepository: Repository<growing_strength_data>,

    @InjectRepository(AboutDuctileIron)
    private readonly AboutDuctileIronRepository: Repository<AboutDuctileIron>,

    @InjectRepository(ManufacturingFacilities)
    private readonly ManufacturingFacilitiesRepository: Repository<ManufacturingFacilities>,

    @InjectRepository(headings)
    private readonly headingsRepository: Repository<headings>,

    @InjectRepository(AboutPeopleData)
    private readonly AboutPeopleDataRepository: Repository<AboutPeopleData>,

    @InjectRepository(about_technology_innovation)
    private readonly about_technology_innovationRepository: Repository<about_technology_innovation>,

    @InjectRepository(Vision)
    private readonly VisionRepository: Repository<Vision>,

    @InjectRepository(VisionPrinciples)
    private readonly VisionPrinciplesRepository: Repository<VisionPrinciples>,

    @InjectRepository(Mission)
    private readonly MissionRepository: Repository<Mission>,

    @InjectRepository(board_commitee_hero_data)
    private readonly board_commitee_hero_dataRepository: Repository<board_commitee_hero_data>,

    @InjectRepository(BoardCommitteData)
    private readonly BoardCommitteDataRepository: Repository<BoardCommitteData>,

    @InjectRepository(Directors)
    private readonly DirectorsRepository: Repository<Directors>,

    @InjectRepository(AllPagesTitle)
    private readonly AllPagesTitleRepository: Repository<AllPagesTitle>,


        @InjectRepository(ProcessInnovationHero)
        private ProcessInnovationHeroRepository: Repository<ProcessInnovationHero>,
    
        @InjectRepository(PipesToInhospitableKargil)
        private PipesToInhospitableKargilRepository: Repository<PipesToInhospitableKargil>,
    
        @InjectRepository(ElectrosteelIsro)
        private electrosteelIsroRepository: Repository<ElectrosteelIsro>,
    
        @InjectRepository(ReachingStars)
        private ReachingStarsRepository: Repository<ReachingStars>,
    
        @InjectRepository(ViaHelicopter)
        private ViaHelicopterRepository: Repository<ViaHelicopter>,
    
        @InjectRepository(UltimateDIPipes)
        private UltimateDIPipesRepository: Repository<UltimateDIPipes>,
    
        @InjectRepository(changiWater)
        private changiWaterRepository: Repository<changiWater>,
    
        @InjectRepository(ProductInnovationHeroSection)
        private readonly heroSectionRepository: Repository<ProductInnovationHeroSection>,
    
        @InjectRepository(ElectrolockJoint)
        private readonly electrolockJointRepository: Repository<ElectrolockJoint>,
    
        @InjectRepository(TrenchlessDIPipes)
        private readonly trenchlessDIPipesRepository: Repository<TrenchlessDIPipes>,
    
        @InjectRepository(PolyurethaneLining)
        private readonly polyurethaneLiningRepository: Repository<PolyurethaneLining>,
    
        @InjectRepository(PolyurethaneCoating)
        private readonly polyurethaneCoatingRepository: Repository<PolyurethaneCoating>,

        @InjectRepository(LegendHeroSection)
        private legendheroRepository: Repository<LegendHeroSection>,

        @InjectRepository(LegendEclCard)
        private legendcardRepository: Repository<LegendEclCard>,

        @InjectRepository(LegendEclVideo)
        private legendvideoRepository: Repository<LegendEclVideo>,

        @InjectRepository(Milestone)
        private milestoneRepository: Repository<Milestone>,
        @InjectRepository(MilestoneBanner)
        private MilestoneBannerRepository: Repository<MilestoneBanner>,

        @InjectRepository(SectionContent)
        private sectionRepo: Repository<SectionContent>,

        @InjectRepository(Testimonial)
        private testimonialRepo: Repository<Testimonial>,

        @InjectRepository(Reward)
        private rewardRepo: Repository<Reward>,

        @InjectRepository(Blogs)
        private BlogsRepo: Repository<Blogs>,

        @InjectRepository(AllBanner)
        private readonly allBannerRepo: Repository<AllBanner>,

        @InjectRepository(CommonTitle)
        private readonly CommonTitleRepository: Repository<CommonTitle>

    ) {}

    //////////AboutFrontend/////////////
    async getAllAboutMainData() {
        try {
            const [
            aboutMain,
            growingStrength,
            ductileIronPipes,
            heading,
            facilities,
            peopleData,
            technologyInnovations,
            ] = await Promise.all([
            this.aboutMainRepository.find(),
            this.growingStrengthRepository.find(),
            this.AboutDuctileIronRepository.find(),
            this.headingsRepository.findOne({
                where: { section_type: 'about_manufacturing_facilities' },
            }),
            this.ManufacturingFacilitiesRepository.find(),
            this.AboutPeopleDataRepository.find(),
            this.about_technology_innovationRepository.find(),
            ]);

            const formattedFacilities = facilities.map((record) => ({
            id: record.id,
            title: record.title,
            description: record.description,
            features: record.features ? JSON.parse(record.features) : [],
            phone: record.phone,
            address: record.address,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            }));

            return {
            status: true,
            statusCode: 200,
            message: 'About main data fetched successfully',
            data: {
                aboutMain: aboutMain || [],
                growingStrength: growingStrength || [],
                ductileIronPipes: ductileIronPipes || [],
                manufacturingFacilities: {
                heading: heading
                    ? {
                        id: heading.id,
                        title: heading.title,
                        description: heading.description,
                        section_type: heading.section_type,
                        createdAt: heading.createdAt,
                        updatedAt: heading.updatedAt,
                    }
                    : null,
                facilities: formattedFacilities,
                totalFacilities: formattedFacilities.length,
                },
                peopleData: peopleData || [],
                technologyInnovations: technologyInnovations || [],
            },
            };
        } catch (error) {
            console.error('Error:', error);
            return {
            status: false,
            statusCode: 500,
            message: 'Failed to fetch all about page data',
            error: error.message,
            };
        }
    }

    async getAllVisionMissionData() {
        try {
            const [
            visionBanner,
            vision,
            mission,
            principles,
            principlesHeading,
            ] = await Promise.all([
                this.headingsRepository.find({
                    where: { section_type: 'vision' },
                }),
                this.VisionRepository.find(),
                this.MissionRepository.find(),
                this.VisionPrinciplesRepository.find(),
                this.headingsRepository.findOne({
                    where: { section_type: 'vision_principle' },
                }),
            ]);

            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'Vision and Mission data fetched successfully',
                data: {
                    visionBanner: visionBanner || [],
                    vision: vision || [],
                    mission: mission || [],
                    principles: {
                    heading: principlesHeading || null,
                    principles: principles || [],
                    },
                },
            };
        } catch (error) {
            return {
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to fetch Vision and Mission data',
                error: error.message,
            };
        }
    }

    async getAllDirectors() {
        try {
            const directors = await this.DirectorsRepository.find({
                order: { 
                    id: 'ASC' 
                },
            });

            const [pageTitle] = await this.AllPagesTitleRepository.find({
            where: { page_name: 'director' },
                order: { id: 'ASC' },
                take: 1,
            });

            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: directors.length > 0
                    ? 'All directors fetched successfully'
                    : 'No directors found',
                data: {
                    name1: pageTitle?.name1 ?? null,
                    name2: pageTitle?.name2 ?? null,
                    data: directors, 
                },
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

    async getAllBoardCommitteePageData() {
        try {
            const [heroData, boardCommitteeData] = await Promise.all([
            this.board_commitee_hero_dataRepository.find(),
            this.BoardCommitteDataRepository.find(),
            ]);

            const formattedCommittee = boardCommitteeData.map((item) => ({
                ...item,
                rows: item.rows ? JSON.parse(item.rows) : [],
            }));

            return {
                status: true,
                statusCode: 200,
                message: 'Board committee page data fetched successfully',
                data: {
                    heroSection: heroData || [],
                    committeeMembers: formattedCommittee,
                },
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                status: false,
                statusCode: 500,
                message: 'Failed to fetch board committee page data',
                error: error.message,
            };
        }
    }

    async getAllProcessInnovationData() {
    try {
        const [
        heroSection,
        pipesToInhospitableKargil,
        electrosteelIsro,
        reachingStars,
        viaHelicopter,
        ultimateDIPipes,
        changiWater,
        ] = await Promise.all([
        this.ProcessInnovationHeroRepository.find(),
        this.PipesToInhospitableKargilRepository.find(),
        this.electrosteelIsroRepository.find({
            order: { created_at: 'ASC' },
        }),
        this.ReachingStarsRepository.find({
            order: { created_at: 'ASC' },
        }),
        this.ViaHelicopterRepository.find({
            order: { created_at: 'ASC' },
        }),
        this.UltimateDIPipesRepository.find({
            order: { created_at: 'ASC' },
        }),
        this.changiWaterRepository.find({
            order: { created_at: 'ASC' },
        }),
        ]);

        return {
        status: true,
        statusCode: 200,
        message: 'All process innovation data fetched successfully',
        data: {
            heroSection: heroSection || [],
            pipesToInhospitableKargil: pipesToInhospitableKargil || [],
            electrosteelIsro: electrosteelIsro || [],
            reachingStars: reachingStars || [],
            viaHelicopter: viaHelicopter || [],
            ultimateDIPipes: ultimateDIPipes || [],
            changiWater: changiWater || [],
        },
        };
    } catch (error) {
        console.error('Error:', error);
        return {
        status: false,
        statusCode: 500,
        message: 'Failed to fetch process innovation data',
        error: error.message,
        };
    }
    }

    private getRepositoryBySection(section: string): Repository<any> {
        switch (section) {
        case 'hero-section':
            return this.heroSectionRepository;
        case 'electrolock-joint':
            return this.electrolockJointRepository;
        case 'trenchless-di-pipes':
            return this.trenchlessDIPipesRepository;
        case 'polyurethane-lining':
            return this.polyurethaneLiningRepository;
        case 'polyurethane-coating':
            return this.polyurethaneCoatingRepository;
        default:
            throw new BadRequestException('Invalid section name');
        }
    }

    async getAllProductInnovationDataV2(): Promise<{
        status: boolean;
        statusCode: number;
        message: string;
        data: {
            section: string;
            data: any;
            message: string;
            statusCode: number;
        }[];
    }> {
        const sections = [
            'hero-section',
            'electrolock-joint',
            'trenchless-di-pipes',
            'polyurethane-lining',
            'polyurethane-coating'
        ];

        const results = await Promise.all(
            sections.map(async (section) => {
                try {
                    const repository = this.getRepositoryBySection(section);
                    const records = await repository.find({
                        order: { created_at: 'ASC' },
                        take: 1,
                    });

                    return {
                        section,
                        data: records[0] || null,
                        message: `${section} fetched successfully`,
                        statusCode: 200,
                    };
                } catch (error) {
                    return {
                        section,
                        data: null,
                        message: `Error fetching ${section}`,
                        statusCode: 400,
                    };
                }
            })
        );

        return {
            status: true,
            statusCode: 200,
            message: 'Sections fetched successfully',
            data: results,
        };
    }

    async getAllEclLegendsData() {
        try {
            const [heroData, cardData,videodata] = await Promise.all([
            this.legendheroRepository.find(),
            this.legendcardRepository.find(),
            this.legendvideoRepository.find(),
            ]);

            return {
                status: true,
                statusCode: 200,
                message: 'Ecl Legends data fetched successfully',
                data: {
                    heroSection: heroData || [],
                    cardData: cardData || [],
                    videoData: videodata || [],
                },
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                status: false,
                statusCode: 500,
                message: 'Failed to fetch Ecl Legends data',
                error: error.message,
            };
        }
    }

    async getAllMilestonesData() {
        const [milestone_hero, milestone_heading, milestones] = await Promise.all([
            this.MilestoneBannerRepository.find(),
            this.headingsRepository.findOne({ where: { section_type: 'milestones' } }),
            this.milestoneRepository.find({
                order: { year: 'ASC', id: 'ASC' }
            })
        ]);
        
        // Validate required data
        if (!milestone_hero || milestone_hero.length === 0) {
            throw new NotFoundException(`Milestone banner data not found`);
        }
        
        if (!milestone_heading) {
            throw new NotFoundException(`Milestone heading data not found`);
        }
        
        // Return combined structured data
        return {
            status: true,
            statusCode: 200,
            message: 'Milestones data fetched successfully.',
            data: {
                hero_banner: milestone_hero,
                section_heading: {
                id: milestone_heading.id,
                title: milestone_heading.title,
                sub_title: milestone_heading.sub_title,
                description: milestone_heading.description,
                section_type: milestone_heading.section_type,
                },
                milestones_list: milestones.map(milestone => ({
                id: milestone.id,
                year: milestone.year,
                title: milestone.title,
                description: milestone.description,
                image: milestone.image,
                // Add other fields as needed
                })),
                summary: {
                total_milestones: milestones.length,
                total_years: [...new Set(milestones.map(m => m.year))].length,
                },
            },
        };
    }

    async PeopleData() {
        const [sectionRepo, testimonialRepo, rewardRepo, peopleDataContent, peopleHeroData, peopleLifeAtEcl] = await Promise.all([
            this.sectionRepo.find({ take: 1 }),
            this.testimonialRepo.find({ take: 1 }),
            this.rewardRepo.find({ take: 1 }),
            this.BlogsRepo.find({ where: { category: 'people_data_content' } }),
            this.allBannerRepo.findOne({ where: { page_name: 'people-hero' } }),
            this.BlogsRepo.findOne({ where: { category: 'people-life-at-ecl' } })
        ]);

        const parseJsonField = (value: any) => {
            if (!value) return null;
            if (typeof value !== 'string') return value;
            try {
                const parsed = JSON.parse(value);
                // Recursively parse nested JSON if needed
                if (typeof parsed == 'object' && parsed != null) {
                    for (const key in parsed) {
                        if (typeof parsed[key] == 'string') {
                            try {
                                const nestedParsed = JSON.parse(parsed[key]);
                                if (typeof nestedParsed == 'object') {
                                    parsed[key] = nestedParsed;
                                }
                            } catch {
                                // Not valid JSON, keep as is
                            }
                        }
                    }
                }
                return parsed;
            } catch {
                return value;
            }
        };
        
        const processedSectionContent = sectionRepo?.[0] ? {
            ...sectionRepo[0],
            image1: parseJsonField(sectionRepo[0].image1),
            image2: parseJsonField(sectionRepo[0].image2),
        } : null;

        const processedTestimonial = testimonialRepo?.[0] ? {
            ...testimonialRepo[0],
            image1: parseJsonField(testimonialRepo[0].image1),
            image2: parseJsonField(testimonialRepo[0].image2),
        } : null;

        const processedReward = rewardRepo?.[0] ? {
            ...rewardRepo[0],
            pragatiData: parseJsonField(rewardRepo[0].pragatiData),
            pratihbaImages: parseJsonField(rewardRepo[0].pratihbaImages),
        } : null;

        const processedPeopleLife = peopleLifeAtEcl ? {
            ...peopleLifeAtEcl,
            images: parseJsonField(peopleLifeAtEcl.images),
            slider_image: parseJsonField(peopleLifeAtEcl.slider_image),
        } : null;

        const processedPeopleDataContent = peopleDataContent.map(item => {
            const parsedItem = { ...item };
            if (parsedItem.images && typeof parsedItem.images === 'string') {
                parsedItem.images = parseJsonField(parsedItem.images);
            }
            if (parsedItem.slider_image && typeof parsedItem.slider_image === 'string') {
                parsedItem.slider_image = parseJsonField(parsedItem.slider_image);
            }
            return parsedItem;
        });

        return {
            status: true,
            statusCode: 200,
            message: 'People data fetched successfully.',
            data: {
                section_content: processedSectionContent,
                testimonial: processedTestimonial,
                reward: processedReward,
                people_data_content: processedPeopleDataContent,
                people_hero_data: peopleHeroData || null,
                people_life_at_ecl: processedPeopleLife,
            }
        };
    }

    async getCommonTitle(category: string) {
      if (!category) {
          throw new Error('Category is required');
      }
      
      const existingData = await this.CommonTitleRepository.findOne({
          where: { category: category }
      });
      
      if (!existingData) {
        return {
            status: false,
            statusCode: 404,
            message: 'Common title not found',
            data: null
        };
      }
      
      return {
          status: true,
          statusCode: 200,
          message: 'Common title data fetched successfully',
          data: existingData
      };
    }

    async findByPageName(page_name: string): Promise<AllBanner> {
        const unit = await this.allBannerRepo.findOne({
        where: { page_name: page_name },
        });
        if (!unit) {
        throw new NotFoundException(`Page with name "${page_name}" not found`);
        }
        return unit;
    }
}
