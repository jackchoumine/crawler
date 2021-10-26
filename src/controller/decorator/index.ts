/*
 * @Description :
 * @Date        : 2021-10-26 21:36:17 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-26 22:45:27 +0800
 * @LastEditors : JackChou
 */
import { Router } from 'express'
import { isFunction } from '../../utils'
// FIXME 编译后无法识别路径别名
// import { isFunction } from '@utils/index'
export const router = Router()

export function controller(constructor: any) {
  const prototype = constructor.prototype

  Object.keys(prototype).forEach(key => {
    const path = Reflect.getMetadata('path', prototype, key)
    const handler = prototype[key]
    // if (path && method && handler) {
    if (path && isFunction(handler)) {
      router.get(path, handler)
    }
  })

  // for (const key in prototype) {
  //   const path = Reflect.getMetadata('path', prototype, key)
  //   if (path) {
  //     router.get(path, prototype[key])
  //   }
  // }
}

export function get(path: string) {
  return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('path', path, prototype, methodName)
  }
}
