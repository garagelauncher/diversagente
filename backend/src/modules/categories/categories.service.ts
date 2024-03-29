import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll(options: PaginateOptions) {
    const { skip, take, where, orderBy, include, cursor } =
      parsePaginationToPrisma<
        Prisma.CategoryWhereInput,
        Prisma.CategoryInclude,
        Prisma.CategoryWhereUniqueInput
      >(options);

    return await this.prisma.category.findMany({
      skip,
      take,
      where,
      orderBy,
      cursor,
      include,
    });
  }

  async findOne(id: string) {
    //return this.prisma.category.findUnique({ where: { id } });

    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    if (updateCategoryDto.icon || updateCategoryDto.iconProvider) {
      await this.prisma.subcategory.updateMany({
        where: {
          categoriesIds: {
            has: id,
          },
        },
        data: {
          icon: updateCategoryDto.icon,
          iconProvider: updateCategoryDto.iconProvider,
        },
      });
    }

    return category;
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
