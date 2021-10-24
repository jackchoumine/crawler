/*
 * @Description :
 * @Date        : 2021-10-25 00:04:12 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 00:32:59 +0800
 * @LastEditors : JackChou
 */
import express, { Request, Response } from 'express'
import router from './route'
const app = express()

app.use(router)

app.listen(3000, () => {
  console.log('server is running at port 3000')
})
