import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';
import { FeedbackRdo } from './rdo/feedback.rdo';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/')
  public async index(@Query() query) {
    const feedbacks = await this.feedbackService.getFeedbacksByTaskId(
      parseInt(query.taskId, 10)
    );
    return fillObject(FeedbackRdo, feedbacks);
  }

  @Post('/')
  public async create(@Body() dto: CreateFeedbackDto) {
    const newFeedback = await this.feedbackService.create(dto);
    return fillObject(FeedbackRdo, newFeedback);
  }
}
