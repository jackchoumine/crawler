/*
 * @Description : 爬虫类
 * @Date        : 2021-10-24 17:11:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 18:02:27 +0800
 * @LastEditors : JackChou
 */
import * as superagent from 'superagent'
import * as cheerio from 'cheerio'
class Crawler {
  private url = 'https://movie.douban.com/cinema/nowplaying/chengdu/'
  private playingMovies: unknown[] = []
  getMovieInfo(htmlCode: string) {
    const $ = cheerio.load(htmlCode)
    const playing = $('#nowplaying')
    const list = playing.find('.lists')
    list.children().each((index, element) => {
      const cheerioObj = $(element)
      const poster = cheerioObj.find('.poster').find('img').attr('src')
      const movie = cheerioObj.data()
      this.playingMovies.push({ poster: poster, ...movie })
    })
  }
  async getRawHtml() {
    const result = await superagent.get(this.url)
    this.getMovieInfo(result.text)
  }
  constructor() {
    this.getRawHtml()
  }
}
const crawler = new Crawler()
