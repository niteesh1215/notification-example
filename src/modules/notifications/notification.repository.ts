import { Notification } from './notification'
import { NotificationRepositoryPort } from './notification.repository.port'
import { NotificationStatus } from './notification.type'

export class InMemoryNotificationRepository
  implements NotificationRepositoryPort
{
  private notifications: Notification[] = []

  getId(): string {
    return crypto.randomUUID()
  }

  async create(notification: Notification): Promise<Notification> {
    this.notifications.push(notification.clone())
    return notification
  }

  async delete(id: string): Promise<boolean> {
    const idx = this.notifications.findIndex((i) => i.id == id)

    if (idx !== -1) {
      this.notifications.splice(idx, 1)
      return true
    }

    return false
  }
  async getAll(filters?: {
    statuses?: NotificationStatus[]
  }): Promise<Notification[]> {
    const { statuses } = filters ?? {}

    return this.notifications
      .filter((i) => (statuses ? statuses.includes(i.status) : true))
      .map((i) => i.clone())
  }

  async getById(id: string): Promise<Notification | null> {
    const notification = this.notifications.filter((i) => i.id === id)

    if (notification.length == 1) return notification[0].clone()

    return null
  }

  async updateStatus(id: string, status: NotificationStatus): Promise<boolean> {
    const notification = this.notifications.filter((i) => i.id === id)

    if (notification.length == 0) return false

    notification[0].status = status

    return true
  }
}
