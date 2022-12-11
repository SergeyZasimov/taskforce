import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { fillObject } from '@taskforce/core';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const task = await this.taskService.getTask(parseInt(id, 10));
    return fillObject(TaskRdo, task);
  }

  @Post('/')
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.updateTask(
      parseInt(id, 10),
      dto
    );
    return fillObject(TaskRdo, updatedTask);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.taskService.deleteTask(parseInt(id, 10));
  }
}
