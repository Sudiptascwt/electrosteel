import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mini_stats } from '../../entity/mini_stats.entity';
import { ecl_products } from '../../entity/ecl_products.entity';
import { headings } from 'src/entity/headings.entity';
import * as fs from 'fs';
import * as path from 'path';
import { ecl_productsDto } from 'src/dto/ecl_products.dto';
import { headingsDto } from 'src/dto/headings.dto';

@Injectable()
export class ecl_productsService {
  constructor(
    @InjectRepository(ecl_products)
    private readonly ecl_productsRepository: Repository<ecl_products>,
    @InjectRepository(headings)
    private readonly headingsRepository: Repository<headings>,
  ) {}

  async saveecl_products(data: any) {
    if (!data) {
      throw new Error("No data received");
    }

    let existingHeading = await this.headingsRepository.findOne({
      where: { section_type: 'ecl_products' }
    });

    const headingData = {
      title: data.title || '',
      sub_title: data.sub_title || '',
      description: data.description || '',
      section_type: 'ecl_products'
    };

    if (existingHeading) {
      await this.headingsRepository.update(existingHeading.id, headingData);
    } else {
      existingHeading = await this.headingsRepository.save(headingData);
    }

    await this.ecl_productsRepository.clear();
    const savedProducts = [];
    for (const product of data.products) {
      const newProduct = this.ecl_productsRepository.create({
        label: product.label,
        sublabel: product.sublabel,
        icon: product.icon,
        title: product.title,
        description: product.description,
        properties: product.properties ? String(product.properties) : 'false',
        image: product.image,
        btnLink: product.btnLink
      });
      
      const savedProduct = await this.ecl_productsRepository.save(newProduct);
      savedProducts.push(savedProduct);
    }

    return {
      status: true,
      statusCode: existingHeading ? 200 : 201,
      message: existingHeading
        ? 'ecl_products section updated successfully.'
        : 'ecl_products section created successfully.',
      data: {
        headings: headingData,
        products: savedProducts
      },
    };
  }

  async getAllecl_products() {
    const headings = await this.headingsRepository.findOne({
      where: { section_type: 'ecl_products' }
    });
    const products = await this.ecl_productsRepository.find({
      order: { id: 'ASC' } 
    });

    const formattedResponse = {
      title: headings?.title || '',
      sub_title: headings?.sub_title || '',
      description: headings?.description || '',
      products: products.map(product => ({
        id: product.id,
        label: product.label,
        sublabel: product.sublabel,
        icon: product.icon,
        title: product.title,
        description: product.description,
        properties: product.properties === 'true',
        image: product.image,
        btnLink: product.btnLink
      }))
    };

    return {
      status: true,
      statusCode: 200,
      message: products.length ? 'ecl_products section fetched successfully.' : 'No ecl_products section found.',
      data: formattedResponse,
    };
  }

  // async deleteAllecl_products() {
  //   await this.ecl_productsRepository.clear();
  //   await this.headingsRepository.delete({ section_type: 'ecl_products' });

  //   return {
  //     status: true,
  //     statusCode: 200,
  //     message: 'ecl_products section deleted successfully.',
  //   };
  // }
}