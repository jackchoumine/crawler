/*
 * @Description :
 * @Date        : 2021-10-25 01:53:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-26 23:37:12 +0800
 * @LastEditors : JackChou
 */
declare namespace Express {
  interface Request {
    name: string
  }
}

// = Record<PropertyKey,unknown>
declare interface BodyRequest<T extends Record<PropertyKey, unknown>> extends Request {
  body: T
}
