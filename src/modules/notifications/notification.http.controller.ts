import { Request, Response } from 'express'
import { NotificationService } from './notification.service'
import { NotificationStatus } from './notification.type'

export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  create(req: Request, res: Response) {
    const body = req.body

    if (!body.price)
      return res.status(400).json({
        message: 'Invalid price',
      })

    this.service
      .createFromProps({ price: Number(body.price) })
      .then((notification) => {
        res.status(201).json(notification.toJSON())
      })
      .catch((err) => {
        console.log('Error in creating', err)
        res.status(500).json({
          message: 'Something went wrong',
        })
      })
  }

  getAll(req: Request, res: Response) {
    const query = req.query

    const status = query.status

    const statuses = (status as string)?.split(',') as
      | NotificationStatus[]
      | undefined

    this.service
      .getAll(statuses)
      .then((notifications) => {
        res.status(200).json(notifications.map((i) => i.toJSON()))
      })
      .catch((err) => {
        console.log('Error in creating', err)
        res.status(500).json({
          message: 'Something went wrong',
        })
      })
  }

  delete(req: Request, res: Response) {
    const { id } = req.params

    this.service
      .delete(id)
      .then(() => {
        res.status(204).send()
      })
      .catch((err) => {
        console.log('Error in sending notifcation', err)
        res.status(500).json({
          message: 'Something went wrong',
        })
      })
  }

  sendNotification(req: Request, res: Response) {
    const { to } = req.body
    const { id } = req.params

    this.service
      .sendNotification(id, to)
      .then(() => {
        res.status(200).json({ message: 'Sent Successfully' })
      })
      .catch((err) => {
        console.log('Error in sending notifcation', err)
        res.status(500).json({
          message: 'Something went wrong',
        })
      })
  }
}
