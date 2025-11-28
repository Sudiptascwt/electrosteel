// import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { GlobalPresence } from '../../entity/global_presense.entity';
// import { GlobalPresenceDto } from '../../dto/global_presense.dto';

// @Injectable()
// export class FrontendGlobalPresenceService {
//   constructor(
//     @InjectRepository(GlobalPresence)
//     private readonly GlobalPresenceRepo: Repository<GlobalPresence>,
//   ) {}
//     async findAll() {
//         const all_global_presence = await this.GlobalPresenceRepo.find();
//         console.log("all_global_presence",all_global_presence);
//         return all_global_presence
//     }

//     async findById(id: number) {
//         const global_presence = await this.GlobalPresenceRepo.findOne({where:{id}});    
//         if (!global_presence) {
//             throw new NotFoundException({
//               status: false,
//               statusCode: HttpStatus.NOT_FOUND,
//               message: `Global presence with ID ${id} not found`,
//             });
//         }
//         return global_presence;
//     }
// }