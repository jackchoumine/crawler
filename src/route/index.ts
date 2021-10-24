/*
 * @Description :
 * @Date        : 2021-10-25 00:30:58 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 00:47:09 +0800
 * @LastEditors : JackChou
 */
import { Router } from 'express'
const router = Router()
router.get('/', (req, res) => {
  res.send({ data: 'hello' })
})
router.get('/movies', (req, res) => {
  res.send({ data: 'hello world' })
})
export default router
