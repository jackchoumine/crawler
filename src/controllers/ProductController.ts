/*
 * @Description :
 * @Date        : 2021-10-29 21:08:03 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-29 21:56:58 +0800
 * @LastEditors : JackChou
 */
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { post, get, controller } from '../decorators'

@controller()
class ProductController {
  @get('/products')
  async getProducts(req: Request, res: Response): Promise<any> {
    const products = await prisma.product.findMany({
      where: {
        // name: { equals: 'Shoe' },
        // name: { contains: 'mac' },
        price: {
          gt: 100,
          lt: 1400,
        },
      },
    })
    res.json(products)
  }

  @post('/products')
  async createProduct(req: Request, res: Response) {
    const { body } = req
    const product = await prisma.product.create({
      data: body,
    })
    res.json(product)
  }
}

export default ProductController
