import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import {
  EMAIL_SUBJECT,
  EMAIL_SUBSCRIBER_EXISTS,
} from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException } from '@nestjs/common/exceptions';
import { NewTasksDto } from './dto/new-tasks.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailerService: MailerService
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto): Promise<void> {
    const { email } = subscriber;

    const existSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existSubscriber) {
      throw new ConflictException(EMAIL_SUBSCRIBER_EXISTS);
    }

    await this.emailSubscriberRepository.create(
      new EmailSubscriberEntity(subscriber)
    );

    await this.mailerService.sendMail({
      to: email,
      subject: EMAIL_SUBJECT.ADD_SUBSCRIBER,
      template: './add-subscriber.hbs',
      context: {
        subscriber: `${subscriber.email}`,
      },
    });
  }

  public async getNotify(dto: NewTasksDto): Promise<void> {
    const { tasks, email } = dto;

    const newSubscriberEntity = new EmailSubscriberEntity({
      email,
      lastNotify: dayjs().toDate(),
    });

    await this.emailSubscriberRepository.update(email, newSubscriberEntity);

    await this.mailerService.sendMail({
      to: email,
      subject: EMAIL_SUBJECT.GET_NOTIFY,
      template: './get-notify.hbs',
      context: {
        subscriber: `${email}`,
        tasks: tasks,
      },
    });
  }
}
