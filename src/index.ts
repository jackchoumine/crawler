/*
 * @Description :
 * @Date        : 2021-10-25 00:04:12 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-26 22:00:30 +0800
 * @LastEditors : JackChou
 */
import express, { NextFunction, Request, Response } from 'express'
import cookieSession from 'cookie-session'
import { router } from './controller'
const PORT = 3000
const ONE_DAY = 1000 * 60 * 60 * 24

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use((req: Request, res, next: NextFunction) => {
  // TODO 类型融合
  req.name = 'Jack'
  next()
})

// FIXME: 如何使用?
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: ONE_DAY,
  })
)

app.use(router)

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
})
