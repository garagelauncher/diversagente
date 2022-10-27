import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  private async getIconFromSubcategory(subcategoryDto: UpdateSubcategoryDto) {
    const categoriesIds = subcategoryDto.categoriesIds;
    const hasCategory =
      Array.isArray(categoriesIds) && categoriesIds.length > 0;

    if (hasCategory) {
      const category = await this.prisma.category.findUnique({
        where: { id: categoriesIds[0] },
      });

      if (!category) {
        throw new NotFoundException(`Category ${categoriesIds[0]} not found`);
      }

      return {
        icon: category.icon,
        provider: category.iconProvider,
      };
    }

    return null;
  }

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const category = await this.getIconFromSubcategory(createSubcategoryDto);
    Object.assign(createSubcategoryDto, {
      icon: category?.icon,
      iconProvider: category?.provider,
    });

    return await this.prisma.subcategory.create({ data: createSubcategoryDto });
  }

  async findAll(options: PaginateOptions) {
    const { skip, take, where, orderBy, include, cursor } =
      parsePaginationToPrisma<Prisma.SubcategoryWhereInput>(options);

    return await this.prisma.subcategory.findMany({
      skip,
      take,
      where,
      orderBy,
      cursor,
      include,
    });
  }

  findOne(id: string) {
    return this.prisma.subcategory.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    const category = await this.getIconFromSubcategory(updateSubcategoryDto);
    Object.assign(updateSubcategoryDto, {
      icon: category?.icon,
      iconProvider: category?.provider,
    });

    return await this.prisma.subcategory.update({
      where: { id },
      data: updateSubcategoryDto,
    });
  }

  remove(id: string) {
    return this.prisma.subcategory.delete({ where: { id } });
  }
}
