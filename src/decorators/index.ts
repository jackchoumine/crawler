/*
 * @Description :
 * @Date        : 2021-10-26 21:36:17 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-27 01:26:54 +0800
 * @LastEditors : JackChou
 */
import { RequestHandler } from 'express'
import { isFunction } from '../utils'
// FIXME 编译后无法识别路径别名
// import { isFunction } from '@utils/index'
import router from '../route'
// FIXME 如何声明全局类型
type Controller = new (...args: any[]) => unknown

enum Method {
  get = 'get',
  post = 'post',
}
export function controller(root: string = '') {
  return function (constructor: Controller) {
    const prototype = constructor.prototype

    Object.keys(prototype).forEach(key => {
      const path: string = Reflect.getMetadata('path', prototype, key)
      const _path = `${root}${path}`
      const method: Method = Reflect.getMetadata('method', prototype, key)
      const middleware: RequestHandler | undefined = Reflect.getMetadata('middleware', prototype, key)
      console.log(_path)
      console.log(method)
      console.log(middleware)

      const handler: RequestHandler = prototype[key]
      if (middleware && path && method && isFunction(handler)) {
        // NOTE 将 method 声明为 Method 类型，不再报错
        // WHY
        router[method](_path, middleware, handler)
      } else {
        router[method](_path, handler)
      }
    })
  }
}

export function use(middleware: RequestHandler) {
  return function (constructor: any, methodName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('middleware', middleware, constructor, methodName)
  }
}

export function get(path: string) {
  return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('path', path, prototype, methodName)
    Reflect.defineMetadata('method', 'get', prototype, methodName)
  }
}

export const post = getRequestDecorator(Method.post)
// NOTE 装饰器模式改善代码
// export function post(path: string) {
//   return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
//     Reflect.defineMetadata('path', path, prototype, methodName)
//     Reflect.defineMetadata('method', 'post', prototype, methodName)
//   }
// }

function getRequestDecorator(method: Method) {
  return function (path: string) {
    return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata('path', path, prototype, methodName)
      Reflect.defineMetadata('method', method, prototype, methodName)
    }
  }
}
