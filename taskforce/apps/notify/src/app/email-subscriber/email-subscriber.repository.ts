import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepository } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';
import { Model } from 'mongoose';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberModel } from './email-subscriber.model';

@Injectable()
export class EmailSubscriberRepository
  implements CRUDRepository<EmailSubscriberEntity, string, Subscriber>
{
  constructor(
    @InjectModel(EmailSubscriberModel.name)
    private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public findById(): Promise<Subscriber> {
    return Promise.resolve(undefined);
  }

  public async findByEmail(email: string): Promise<Subscriber> | null {
    return this.emailSubscriberModel.findOne({ email });
  }

  public async create(entity: EmailSubscriberEntity): Promise<Subscriber> {
    const newSubscriber = new this.emailSubscriberModel(entity);
    return newSubscriber.save();
  }

  public async update(
    email: string,
    entity: EmailSubscriberEntity
  ): Promise<Subscriber> | null {
    return this.emailSubscriberModel.findOneAndUpdate(
      { email },
      entity.toObject(),
      { new: true }
    );
  }

  public async delete(email: string): Promise<void> | null {
    this.emailSubscriberModel.findOneAndDelete({ email });
  }
}
