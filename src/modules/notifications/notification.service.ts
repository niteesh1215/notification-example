import { NoticationSenderPort } from '../notification-sender'
import { Notification } from './notification'
import { NotificationRepositoryPort } from './notification.repository.port'
import { NotificationStatus } from './notification.type'

export class NotificationService {
  constructor(
    private repository: NotificationRepositoryPort,
    private notificationSender: NoticationSenderPort,
  ) {}

  create(notification: Notification) {
    return this.repository.create(notification)
  }

  createFromProps(props: { price: number }) {
    return this.create(new Notification(this.repository.getId(), props.price))
  }

  getAll(statuses?: NotificationStatus[]) {
    return this.repository.getAll({
      statuses: statuses,
    })
  }

  async sendNotification(id: string, to: string[]) {
    const notification = await this.repository.getById(id)

    // throw a specific error to indicate not found
    if (!notification) throw Error('Invalid id')

    const isSuccess = await this.notificationSender.send({
      to,
      notification: notification,
    })

    if (isSuccess) {
      await this.repository.updateStatus(id, NotificationStatus.SENT)
    }

    return isSuccess
  }

  delete(id: string) {
    return this.repository.delete(id)
  }
}
