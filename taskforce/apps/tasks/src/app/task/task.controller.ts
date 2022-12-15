import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { fillObject } from '@taskforce/core';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  public async show(@Param('id') id: number) {
    const task = await this.taskService.getTask(id);
    return fillObject(TaskRdo, task);
  }

  @Get('/')
  public async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @Post('/')
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @Patch('/:id')
  public async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.updateTask(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    await this.taskService.deleteTask(id);
  }
}
