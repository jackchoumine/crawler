/*
 * @Description :
 * @Date        : 2021-10-29 21:08:03 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-29 21:33:11 +0800
 * @LastEditors : JackChou
 */
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { get, controller } from '../decorators'

@controller()
class ProductController {
  @get('/products')
  async getProducts(req: Request, res: Response): Promise<any> {
    const products = await prisma.product.findMany()
    res.json(products)
  }
}

export default ProductController
