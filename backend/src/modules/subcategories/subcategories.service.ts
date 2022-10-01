import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const categoriesIds = createSubcategoryDto.categoriesIds;
    const hasCategory =
      Array.isArray(categoriesIds) && categoriesIds.length > 0;

    if (hasCategory) {
      const category = await this.prisma.category.findUnique({
        where: { id: categoriesIds[0] },
      });

      if (!category) {
        throw new NotFoundException(`Category ${categoriesIds[0]} not found`);
      }

      Object.assign(createSubcategoryDto, {
        icon: category.icon,
      });
    }

    return await this.prisma.subcategory.create({ data: createSubcategoryDto });
  }

  findAll() {
    return this.prisma.subcategory.findMany({});
  }

  findOne(id: string) {
    return this.prisma.subcategory.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.prisma.subcategory.update({
      where: { id },
      data: updateSubcategoryDto,
    });
  }

  remove(id: string) {
    return this.prisma.subcategory.delete({ where: { id } });
  }
}
