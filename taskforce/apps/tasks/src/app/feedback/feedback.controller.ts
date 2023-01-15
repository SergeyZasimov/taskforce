import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestSchema,
  ForbiddenSchema,
  TaskNotFoundSchema,
  UserUnauthorizedSchema,
} from '@taskforce/api-documentation';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import {
  FEEDBACK_API_OPERATION,
  FEEDBACK_RESPONSE_DESCRIPTION,
} from './feedback.constant';
import { FeedbackService } from './feedback.service';
import { FeedbackQuery } from './query/feedback.query';
import { FeedbackRdo } from './rdo/feedback.rdo';

const { CREATE, SHOW_ALL } = FEEDBACK_API_OPERATION;

const {
  SHOW_ALL_OK,
  BAD_REQUEST,
  TASK_NOT_FOUND,
  UNAUTHORIZED,
  CREATED,
  FORBIDDEN_ROLE,
} = FEEDBACK_RESPONSE_DESCRIPTION;

@ApiTags('Отклики')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({ description: SHOW_ALL })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: SHOW_ALL_OK,
    type: [FeedbackRdo],
  })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async index(@Query() { taskId }: FeedbackQuery) {
    const feedbacks = await this.feedbackService.getFeedbacksByTaskId(taskId);
    return fillObject(FeedbackRdo, feedbacks);
  }

  @ApiOperation({ description: CREATE })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED,
    type: FeedbackRdo,
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
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Contractor)
  @Post('/')
  public async create(
    @Body() dto: CreateFeedbackDto,
    @GetCurrentUser('sub') contractorId: string
  ) {
    const newFeedback = await this.feedbackService.create(dto, contractorId);
    return fillObject(FeedbackRdo, newFeedback);
  }
}
