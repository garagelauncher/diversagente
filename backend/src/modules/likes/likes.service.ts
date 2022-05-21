import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLikeDto: CreateLikeDto) {
    return this.prisma.like.create({ data: createLikeDto });
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: string) {
    return `This action returns a #${id} like`;
  }

  update(id: string, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: string) {
    return `This action removes a #${id} like`;
  }
}
