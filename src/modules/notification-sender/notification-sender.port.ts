import { Notification } from '../notifications/notification'

export interface NoticationSenderPort {
  send(props: { to: string[]; notification: Notification }): Promise<boolean>
}
