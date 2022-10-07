import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  findAll() {
    return this.prisma.comment.findMany({});
  }

  async findOne(id: string) {
    //return this.prisma.category.findUnique({ where: { id } });

    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    return comment;
  }

  update(id: string, UpdateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: UpdateCommentDto,
    });
  }

  remove({ id, postId }: DeleteCommentDto) {
    Logger.warn(`Removed like ${id} from post ${postId}`);
    return this.prisma.comment.delete({ where: { id } });
  }
}
