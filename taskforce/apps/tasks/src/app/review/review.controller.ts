import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestSchema,
  ConflictSchema,
  ForbiddenSchema,
  REVIEW_API_OPERATION,
  REVIEW_RESPONSE_DESCRIPTION,
  TaskNotFoundSchema,
  TasksApiTag,
  UserUnauthorizedSchema,
} from '@taskforce/api-documentation';
import { fillObject } from '@taskforce/core';
import { RouteModule, UserRole } from '@taskforce/shared-types';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewQuery } from './query/review.query';
import { RatingRdo } from './rdo/rating.rdo';
import { ReviewRdo } from './rdo/review.rdo';

import { ReviewService } from './review.service';

const { CONTRACTOR_REVIEW, CREATE_REVIEW, GET_RATING } = REVIEW_API_OPERATION;

const {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  TASK_NOT_FOUND,
  UNAUTHORIZED,
  SHOW_ALL,
  RATING,
  FORBIDDEN_ROLE,
} = REVIEW_RESPONSE_DESCRIPTION;

@ApiTags(TasksApiTag.Review)
@Controller(RouteModule.Reviews)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ description: CREATE_REVIEW })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED,
    type: ReviewRdo,
  })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiForbiddenResponse({ description: FORBIDDEN_ROLE, type: ForbiddenSchema })
  @ApiConflictResponse({ description: CONFLICT, type: ConflictSchema })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Post('')
  public async create(
    @Body() dto: CreateReviewDto,
    @GetCurrentUser('sub') customerId: string
  ) {
    const review = await this.reviewService.create(dto, customerId);
    return fillObject(ReviewRdo, review);
  }

  @ApiOperation({ description: CONTRACTOR_REVIEW })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SHOW_ALL,
    type: [ReviewRdo],
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @Get('')
  public async getByContractorId(@Query() { contractorId }: ReviewQuery) {
    const reviews = await this.reviewService.getByContractorId(contractorId);
    return fillObject(ReviewRdo, reviews);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: RATING,
    type: RatingRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST,
  })
  @ApiOperation({ description: GET_RATING })
  @UseGuards(JwtAuthGuard)
  @Get('get-rating')
  public async getRating(@Query() { contractorId }: ReviewQuery) {
    const rating = await this.reviewService.getRating(contractorId);
    return fillObject(RatingRdo, rating);
  }
}
