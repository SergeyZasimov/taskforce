import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';
import { FeedbackQuery } from './query/feedback.query';
import { FeedbackRdo } from './rdo/feedback.rdo';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Show feedbacks by task ID',
    type: FeedbackRdo,
  })
  @Get('/')
  public async index(@Query() { taskId }: FeedbackQuery) {
    const feedbacks = await this.feedbackService.getFeedbacksByTaskId(taskId);
    return fillObject(FeedbackRdo, feedbacks);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new feedback',
    type: FeedbackRdo,
  })
  @Post('/')
  public async create(@Body() dto: CreateFeedbackDto) {
    const newFeedback = await this.feedbackService.create(dto);
    return fillObject(FeedbackRdo, newFeedback);
  }
}
