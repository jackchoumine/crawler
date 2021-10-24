/*
 * @Description :
 * @Date        : 2021-10-25 00:30:58 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 02:21:58 +0800
 * @LastEditors : JackChou
 */
import { Router, Request } from 'express'
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

router.get('/movies', (req, res) => {
  res.send({ data: 'hello world' })
})
export default router
