import { Controller, HttpStatus, Post } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
} from '@nestjs/common/decorators';
import { fillObject } from '@taskforce/core';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskRdo } from '../rdo/task.dto';
import {
  TASKS_BY_CATEGORY_NOT_FOUND_ERROR,
  TASK_NOT_FOUND_ERROR,
} from './task.const';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @Get(':id')
  public async show(@Param() { id }) {
    const existTask = await this.taskService.getTask(id);

    if (!existTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return fillObject(TaskRdo, existTask);
  }

  @Get('')
  public async getByCategory(@Query() { category }) {
    const tasks = await this.taskService.getByCategory(category);
    if (!tasks) {
      throw new Error(TASKS_BY_CATEGORY_NOT_FOUND_ERROR);
    }
    return fillObject(TaskRdo, tasks);
  }

  @Patch(':id')
  public async update(@Param() { id }, @Body() dto: UpdateTaskDto) {
    const existTask = this.taskService.getTask(id);

    if (!existTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    const task = await this.taskService.updateTask(id, dto);
    return fillObject(TaskRdo, task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() { id }) {
    const existTask = this.taskService.getTask(id);

    if (!existTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }
  }
}
