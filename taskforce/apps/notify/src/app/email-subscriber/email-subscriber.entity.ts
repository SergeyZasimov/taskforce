import { Entity } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';

export class EmailSubscriberEntity implements Entity<Subscriber>, Subscriber {
  public email: string;
  public lastNotify?: Date;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  toObject(): Subscriber {
    return { ...this };
  }
  fillEntity(item: Subscriber) {
    this.email = item.email;
    this.lastNotify = item.lastNotify
  }
}
