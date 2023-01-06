import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Show comments by task ID',
    type: CommentRdo,
  })
  @Get('/')
  public async showAllByTaskId(@Query() { taskId }: CommentQuery) {
    const comments = await this.commentService.getComments(taskId);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new comment',
    type: CommentRdo,
  })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(dto);
    return fillObject(CommentRdo, newComment);
  }
}
