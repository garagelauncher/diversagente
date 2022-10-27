import { Injectable, Logger } from '@nestjs/common';
import { MAX_COMPLAINTS } from 'src/shared/constants';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createComplaintDto: CreateComplaintDto) {
    const { resource, resourceId, ...data } = createComplaintDto;
    Logger.log(`ComplaintsService.create: ${JSON.stringify(data)}`);

    const complaint = await this.prisma.complaint.create({
      data,
    });

    const createRelationByResource = {
      post: this.createPostComplaint.bind(this),
      comment: this.createCommentComplaint.bind(this),
      review: this.createReviewComplaint.bind(this),
      location: this.createLocationComplaint.bind(this),
    };

    await createRelationByResource[resource](complaint.id, resourceId);

    return complaint;
  }

  private async createPostComplaint(complaintId: string, postId: string) {
    Logger.log(
      `ComplaintsService.createPostComplaint: ${complaintId} ${postId}`,
    );
    await this.prisma.postComplaint.create({
      data: {
        complaintId,
        postId,
      },
    });

    const countPostComplaints = await this.prisma.postComplaint.count({
      where: {
        postId,
      },
    });
    Logger.log(`countPostComplaints: ${countPostComplaints}`);

    if (countPostComplaints >= MAX_COMPLAINTS) {
      Logger.log(
        `max complaints reached for post ${postId}, deleting post and all related data`,
      );
      await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          isActive: false,
        },
      });
    }
  }

  private async createCommentComplaint(complaintId: string, commentId: string) {
    Logger.log(
      `ComplaintsService.createCommentComplaint: ${complaintId} ${commentId}`,
    );
    await this.prisma.commentComplaint.create({
      data: {
        complaintId,
        commentId,
      },
    });

    const countCommentComplaints = await this.prisma.commentComplaint.count({
      where: {
        commentId,
      },
    });
    Logger.log(`countCommentComplaints: ${countCommentComplaints}`);

    if (countCommentComplaints >= MAX_COMPLAINTS) {
      Logger.log(
        `max complaints reached for comment ${commentId}, deleting comment and all related data`,
      );
      await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          isActive: false,
        },
      });
    }
  }

  private async createReviewComplaint(complaintId: string, reviewId: string) {
    Logger.log(
      `ComplaintsService.createReviewComplaint: ${complaintId} ${reviewId}`,
    );

    await this.prisma.reviewComplaint.create({
      data: {
        complaintId,
        reviewId,
      },
    });

    const countReviewComplaints = await this.prisma.reviewComplaint.count({
      where: {
        reviewId,
      },
    });
    Logger.log(`countReviewComplaints: ${countReviewComplaints}`);

    if (countReviewComplaints >= MAX_COMPLAINTS) {
      Logger.log(
        `max complaints reached for review ${reviewId}, deleting review and all related data`,
      );
      await this.prisma.review.update({
        where: {
          id: reviewId,
        },
        data: {
          isActive: false,
        },
      });
    }
  }

  private async createLocationComplaint(
    complaintId: string,
    locationId: string,
  ) {
    Logger.log(
      `ComplaintsService.createLocationComplaint: ${complaintId} ${locationId}`,
    );
    await this.prisma.locationComplaint.create({
      data: {
        complaintId,
        locationId,
      },
    });

    const countLocationComplaints = await this.prisma.locationComplaint.count({
      where: {
        locationId,
      },
    });
    Logger.log(`countLocationComplaints: ${countLocationComplaints}`);

    if (countLocationComplaints >= MAX_COMPLAINTS) {
      Logger.log(
        `max complaints reached for location ${locationId}, deleting location and all related data`,
      );
      await this.prisma.location.update({
        where: {
          id: locationId,
        },
        data: {
          isActive: false,
        },
      });
    }
  }
}
