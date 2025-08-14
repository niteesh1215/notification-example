import { Notification } from './notification'
import { NotificationStatus } from './notification.type'

export interface NotificationRepositoryPort {
  getId(): string
  create(notification: Notification): Promise<Notification>
  delete(id: string): Promise<boolean>
  getAll(filters?: { statuses?: NotificationStatus[] }): Promise<Notification[]>
  getById(id: string): Promise<Notification | null>

  updateStatus(id: string, status: NotificationStatus): Promise<boolean>
}
