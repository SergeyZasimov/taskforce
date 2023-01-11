import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  FEEDBACK_EXCEPTION_MESSAGE,
} from './feedback.constant';
import { FeedbackService } from './feedback.service';
import { FeedbackQuery } from './query/feedback.query';
import { FeedbackRdo } from './rdo/feedback.rdo';
import {
  BadRequestErrorRdo,
  NotFoundErrorRdo,
  UnauthorizedErrorRdo,
  ForbiddenErrorRdo,
} from '@taskforce/rdo';

const { CREATE, SHOW_ALL } = FEEDBACK_API_OPERATION;

const {
  SHOW_ALL_OK,
  BAD_REQUEST,
  NOT_FOUND,
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
    type: FeedbackRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND,
    type: NotFoundErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND,
    type: NotFoundErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: FORBIDDEN_ROLE,
    type: ForbiddenErrorRdo,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Contractor)
  @Post('/')
  public async create(
    @Body() dto: CreateFeedbackDto,
    @GetCurrentUser('sub') contractorId: string
  ) {
    const newFeedback = await this.feedbackService.create({
      ...dto,
      contractorId,
    });
    return fillObject(FeedbackRdo, newFeedback);
  }
}
