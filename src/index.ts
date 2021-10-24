/*
 * @Description :
 * @Date        : 2021-10-25 00:04:12 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 01:47:30 +0800
 * @LastEditors : JackChou
 */
import express, { NextFunction, Request, Response } from 'express'
import router from './route'
// import bodyParser from 'body-parser'
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use((req: Request, res, next: NextFunction) => {
  // TODO 类型融合
  req.name = 'Jack'
  next()
})
app.use(router)

app.listen(3000, () => {
  console.log('server is running at port 3000')
})
