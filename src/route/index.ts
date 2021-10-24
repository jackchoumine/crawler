/*
 * @Description :
 * @Date        : 2021-10-25 00:30:58 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 03:07:48 +0800
 * @LastEditors : JackChou
 */
import { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { Movie } from '../types'
// type RequestWithBody = Request & {
//   body: {
//     [key: string]: unknown
//   }
// }

// TODO 扩展 声明文件
interface RequestWithBody extends Request {
  body: {
    [key: string]: unknown
  }
}

const router = Router()

router.get('/', (req, res) => {
  const html = `<html>
    <body>
      <form action="login" method="post">
        <input type="password" placeholder=请输入密码 name="password" />
        <button>登录</button>
      </form>
    </body>
  </html>`
  res.send(html)
})

router.post('/login', (req: RequestWithBody, res) => {
  const { password } = req.body
  // console.log(req.session)
  const loggedIn = req.session?.loggedIn

  if (!loggedIn) {
    if (password !== '123') {
      res.send(`${req.name} 密码错误`)
    } else {
      req.session!.loggedIn = true
      res.send('登录成功')
    }
  } else {
    res.send('已登录')
  }
})

router.get('/movies/:id?', (req: Request<{ id: number }>, res: Response) => {
  const filePath = path.resolve(__dirname, '../../data/playing.json')
  const { id } = req.params
  console.log(req.query)
  if (fs.existsSync(filePath)) {
    const json = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(json)
    const queryKeys = Object.keys(req.query)
    if (queryKeys.length) {
      // @ts-ignore
      const filteredData = filterData(queryKeys, data, req.query)
      res.send(filteredData)
    } else {
      res.send(id ? data[id] : data)
    }
  } else {
    res.send([])
  }
})

function filterData<K extends keyof Movie>(keys: K[], data: Movie[], query: Record<string, unknown>): Movie[] {
  return data.filter(item => {
    return keys.some(key => item[key] == query[key])
  })
}
export default router
