import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.category.findMany({});
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
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
