import { Body, Controller, Post } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { Route, RouteModule, SubscribeEvent } from '@taskforce/shared-types';
import { EventPattern } from '@nestjs/microservices';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NewTasksDto } from './dto/new-tasks.dto';
import { GetSubscriberDto } from './dto/get-subscriber.dto';

@Controller(RouteModule.Notify)
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService) {}

  @EventPattern({ cmd: SubscribeEvent.AddSubscriber })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: SubscribeEvent.GetTasks })
  public async getNotify(dto: NewTasksDto) {
    this.subscriberService.getNotify(dto);
  }

  @Post(Route.GetSubscriber)
  public async show(@Body() dto: GetSubscriberDto) {
    return await this.subscriberService.getSubscriber(dto);
  }
}
