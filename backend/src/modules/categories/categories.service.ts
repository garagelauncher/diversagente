import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { PrismaService } from 'src/shared/database/prisma.service';
=======
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
>>>>>>> refactor/setupTests
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

<<<<<<< HEAD
  findAll() {
    return this.prisma.category.findMany({});
=======
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
>>>>>>> refactor/setupTests
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

<<<<<<< HEAD
  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
=======
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    if (updateCategoryDto.icon) {
      await this.prisma.subcategory.updateMany({
        where: {
          categoriesIds: {
            has: id,
          },
        },
        data: {
          icon: updateCategoryDto.icon,
        },
      });
    }

    return category;
>>>>>>> refactor/setupTests
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
