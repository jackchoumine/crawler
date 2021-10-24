/*
 * @Description : 爬虫类
 * @Date        : 2021-10-24 17:11:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 19:44:03 +0800
 * @LastEditors : JackChou
 */
import * as superagent from 'superagent'
import path from 'path'
import fs from 'fs'
import { Movie } from './types'
import MovieAnalyzer from './MovieAnalyzer'
class Crawler {
  private url = 'https://movie.douban.com/cinema/nowplaying/chengdu/'
  private filepath = path.resolve(__dirname, '../data/playing.json')

  constructor(private analyzer: any) {
    this.initSpider()
  }

  private async initSpider() {
    const html = await this.getRawHtml()
    const movieList = this.analyzer.getMovieInfo(html, this.filepath)
    this.saveToJSON(movieList)
  }

  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  private saveToJSON(movies: Movie[]) {
    fs.writeFileSync(this.filepath, JSON.stringify(movies)) // 写入文件
    return true
  }
}
const movieAnalyzer = new MovieAnalyzer()
const crawler = new Crawler(movieAnalyzer)
