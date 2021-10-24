/*
 * @Description : 爬虫类
 * @Date        : 2021-10-24 17:11:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 17:33:37 +0800
 * @LastEditors : JackChou
 */
import * as superagent from 'superagent'
class Crawler {
  private url = 'https://movie.douban.com/cinema/nowplaying/chengdu/'
  private rawHtml = ''
  async getRawHtml() {
    const result = await superagent.get(this.url)
    this.rawHtml = result.text
  }
  constructor() {
    this.getRawHtml()
  }
}
const crawler = new Crawler()
