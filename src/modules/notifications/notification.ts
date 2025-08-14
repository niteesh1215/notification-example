import { NotificationStatus } from './notification.type'

export class Notification {
  status: NotificationStatus
  constructor(
    readonly id: string,
    readonly price: number,
  ) {
    this.status = NotificationStatus.PENDING
  }

  toJSON() {
    return {
      id: this.id,
      price: this.price,
      status: this.status,
    }
  }

  clone() {
    const n = new Notification(this.id, this.price)
    n.status = this.status
    return n
  }
}
