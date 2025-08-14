import { Notification } from '../notifications/notification'
import { NoticationSenderPort } from './notification-sender.port'

export class EmailSender implements NoticationSenderPort {
  async send(props: {
    to: string[]
    notification: Notification
  }): Promise<boolean> {
    const { to, notification } = props

    console.log(`Sending notification on email to ${to}`, {
      id: notification.id,
      price: notification.price,
    })

    return true
  }
}
