import { Controller, Get, Post, Body, Query, Render, Res, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { home_slides } from '../../entity/home_slides.entity';

@Controller('admin/home-slides')
export class HomeSlidesController {
  constructor(
    @InjectRepository(home_slides)
    private slidesRepo: Repository<home_slides>,
  ) {}

  @Get('form')
  @Render('admin/home-slides/form')
  async form(@Query('id') id: string) {
    let slide = null;
    if (id) {
      slide = await this.slidesRepo.findOne({ where: { id: Number(id) } });
    }
    return { slide };
  }

  @Post('save')
  async save(@Body() data: any, @Res() res, @Req() req) {
    try {
      if (data.id) {
        // Update
        await this.slidesRepo.update(data.id, data);
        req.flash('success', 'Slide updated!');
      } else {
        // Create
        await this.slidesRepo.save(data);
        req.flash('success', 'Slide created!');
      }
    } catch (err) {
      req.flash('error', err.message);
    }
    res.redirect('/admin/home-slides/form');
  }
}