import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import {
  EMAIL_FROM,
  EMAIL_SUBSCRIBER_EXISTS,
} from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailerService: MailerService
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto): Promise<void> {
    const { email } = subscriber;

    const existSubscriber = this.emailSubscriberRepository.findByEmail(email);

    if (existSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    await this.emailSubscriberRepository.create(
      new EmailSubscriberEntity(subscriber)
    );

    await this.sendMail(
      email,
      'Subscribe successfully add',
      `User ${email} added to subscribers`
    );
  }

  private async sendMail(
    email: string,
    subject: string,
    text: string
  ): Promise<void> {
    this.mailerService.sendMail({
      to: email,
      from: EMAIL_FROM,
      subject,
      text,
    });
  }
}
