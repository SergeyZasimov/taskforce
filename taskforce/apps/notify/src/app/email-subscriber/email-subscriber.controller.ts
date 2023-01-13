import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { SubscribeEvent } from '@taskforce/shared-types';
import { EventPattern } from '@nestjs/microservices';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NewTasksDto } from './dto/new-tasks.dto';

@Controller()
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService) {}

  @EventPattern({ cmd: SubscribeEvent.AddSubscriber })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({cmd: SubscribeEvent.GetTasks})
  public async getNotify(dto: NewTasksDto) {
    this.subscriberService.getNotify(dto)
  }
}
