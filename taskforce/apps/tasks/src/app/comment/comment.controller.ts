import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:taskId')
  public async showAllByTaskId(@Param('taskId') taskId: string) {
    const comments = await this.commentService.getComments(
      parseInt(taskId, 10)
    );
    return fillObject(CommentRdo, comments);
  }

  @Post('/')
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(dto);
    return fillObject(CommentRdo, newComment);
  }
}
