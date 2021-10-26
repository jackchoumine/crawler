/*
 * @Description :
 * @Date        : 2021-10-26 21:36:17 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-26 21:57:19 +0800
 * @LastEditors : JackChou
 */
import { Router } from 'express'

export const router = Router()

export function controller(constructor: any) {
  for (const key in constructor.prototype) {
    const path = Reflect.getMetadata('path', constructor.prototype, key)
    if (path) {
      router.get(path, constructor.prototype[key])
    }
  }
}

export function get(path: string) {
  return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('path', path, prototype, methodName)
  }
}
