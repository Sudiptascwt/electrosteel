// import { Controller,Get,Post,Put,Delete,Param,Body,ParseIntPipe,HttpStatus } from '@nestjs/common';
// import { CsrProjectsService } from './about.service';
// // import { AboutDto } from '../../../dto/csr_projects.dto';
// import { UseGuards } from '@nestjs/common';
// import { RolesGuard } from '../../role/roles.guard';
// import { Roles } from '../../role/roles.decorator';
// import { UserRole } from '../../admin/users/user.entity';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
// @Controller('csr-projects')
// export class AboutController {
//   constructor(private readonly AboutService: CsrProjectsService) {}

//   ///////About///////////
//   // CREATE
//   @Post()
// //   async create(@Body() createDto: AboutDto) {
// //     const data = await this.AboutService.create(createDto);
// //     return data;
// //   }

//   // GET ALL
//   @Get()
//   async findAll() {
//     const data = await this.AboutService.findAll();
//     return data;
//   }

//   // GET BY ID
//   @Get(':id')
//   async findById(@Param('id', ParseIntPipe) id: number) {
//     const data = await this.AboutService.findById(id);
//     return data;
//   }

//   // UPDATE
// //   @Put(':id')
// //   async update(
// //     @Param('id', ParseIntPipe) id: number,
// //     @Body() updateDto: AboutDto,
// //   ) {
// //     const data = await this.AboutService.update(id, updateDto);
// //     return data;
// //   }

//   // DELETE
//   @Delete(':id')
//   async delete(@Param('id', ParseIntPipe) id: number) {
//     return await this.AboutService.delete(id);
//   }
// }
// export { CsrProjectsService };

