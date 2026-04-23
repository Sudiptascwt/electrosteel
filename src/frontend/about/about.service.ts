import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
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
import { PipesToInhospitableKargil } from 'src/entity/pipestoinhospitablekargil.entity';
import { ElectrosteelIsro } from 'src/entity/electrosteel_isro.entity';
import { ReachingStars } from 'src/entity/ReachingStars.entity';
import { ViaHelicopter } from 'src/entity/ViaHelicopter.entity';
import { UltimateDIPipes } from 'src/entity/UltimateDIPipes.entity';
import { changiWater } from 'src/entity/changiWater.entity';

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
                where: { 
                    status: 1 
                },
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

    async getAllProductInnovationData() {
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
}
