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
    const categoryId = subcategoryDto.categoryId;
    const hasCategory =
      Array.isArray(categoryId) && categoryId.length > 0;

    if (hasCategory) {
      const category = await this.prisma.category.findUnique({
        where: { id: categoryId[0] },
      });

      if (!category) {
        throw new NotFoundException(`Category ${categoryId[0]} not found`);
      }

      return category.icon;
    }

    return null;
  }

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    Object.assign(createSubcategoryDto, {
      icon: await this.getIconFromSubcategory(createSubcategoryDto),
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
    Object.assign(updateSubcategoryDto, {
      icon: await this.getIconFromSubcategory(updateSubcategoryDto),
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
