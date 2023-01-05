import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { GetCurrentUser } from '../../decorators/get-current-user.decorator';
import { Role } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewQuery } from './query/review.query';
import { ReviewRdo } from './rdo/review.rdo';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Post('create')
  public async create(
    @GetCurrentUser('sub') authorId: string,
    @Body() dto: CreateReviewDto
  ) {
    return this.reviewService.create({ ...dto, authorId });
  }

  @Get('')
  public async showByContractorId(@Query() query: ReviewQuery) {
    const review = this.reviewService.findByContractorId(query.contractorId);
    return fillObject(ReviewRdo, review);
  }
}
