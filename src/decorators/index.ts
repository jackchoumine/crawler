/*
 * @Description :
 * @Date        : 2021-10-26 21:36:17 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-27 00:43:45 +0800
 * @LastEditors : JackChou
 */
import { RequestHandler } from 'express'
import { isFunction } from '../utils'
// FIXME 编译后无法识别路径别名
// import { isFunction } from '@utils/index'
import router from '../route'

enum Method {
  get = 'get',
  post = 'post',
}

export function controller(constructor: any) {
  const prototype = constructor.prototype

  Object.keys(prototype).forEach(key => {
    const path = Reflect.getMetadata('path', prototype, key)
    const method: Method = Reflect.getMetadata('method', prototype, key)
    const middleware = Reflect.getMetadata('middleware', prototype, key)
    console.log(path)
    console.log(method)
    console.log(middleware)

    const handler = prototype[key]
    if (middleware && path && method && isFunction(handler)) {
      // NOTE 将 method 声明为 Method 类型，不再报错
      // WHY
      router[method](path, middleware, handler)
    } else {
      router[method](path, handler)
    }
  })

  // for (const key in prototype) {
  //   const path = Reflect.getMetadata('path', prototype, key)
  //   if (path) {
  //     router.get(path, prototype[key])
  //   }
  // }
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
