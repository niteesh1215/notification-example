import express, { Router } from 'express'
import { notificationRouter } from './modules/notifications'

const app = express()

app.use(express.json())

const v1Router = Router()

v1Router.use('/notifications', notificationRouter)

app.use('/api/v1', v1Router)

app.listen(3000, () => {
  console.log('App is running on port 3000')
})
