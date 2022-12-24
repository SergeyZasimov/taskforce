import { Entity } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';

export class EmailSubscriberEntity implements Entity<Subscriber>, Subscriber {
  public email: string;
  public lastDistribution?: Date;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  toObject(): Subscriber {
    return { ...this };
  }
  fillEntity(item: Subscriber) {
    this.email = item.email;
    this.lastDistribution = item.lastDistribution
  }
}
