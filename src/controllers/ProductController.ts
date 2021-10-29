/*
 * @Description :
 * @Date        : 2021-10-29 21:08:03 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-29 22:13:26 +0800
 * @LastEditors : JackChou
 */
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { post, get, controller } from '../decorators'

@controller('/products')
class ProductController {
  @get('/:id?')
  async getProducts(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    console.log('id')
    console.log(id)
    if (id) {
      try {
        //@ts-ignore
        const product = await prisma.product.findOne({
          where: {
            id: { equals: id },
          },
        })
        console.log(product)
        res.json(product)
      } catch (error) {
        //  @ts-ignore
        console.log(error.message)
        res.json({ error })
      }
    } else {
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
  }

  @post()
  async createProduct(req: Request, res: Response) {
    const { body } = req
    const product = await prisma.product.create({
      data: body,
    })
    res.json(product)
  }
}

export default ProductController
