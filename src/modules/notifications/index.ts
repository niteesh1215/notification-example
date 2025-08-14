import { Router } from 'express'
import { NotificationController } from './notification.http.controller'
import { NotificationService } from './notification.service'
import { InMemoryNotificationRepository } from './notification.repository'
import { EmailSender } from '../notification-sender'

const emailSender = new EmailSender()

const notificationService = new NotificationService(
  new InMemoryNotificationRepository(),
  emailSender,
)

const notificationController = new NotificationController(notificationService)

export const notificationRouter = Router()

notificationRouter.post(
  '/',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notificationController.create.bind(notificationController) as any,
)

notificationRouter.get(
  '/', // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notificationController.getAll.bind(notificationController) as any,
)

notificationRouter.post(
  '/:id/send', // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notificationController.sendNotification.bind(notificationController) as any,
)

notificationRouter.delete(
  '/:id', // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notificationController.delete.bind(notificationController) as any,
)
