/*
 * @Description : 爬虫类
 * @Date        : 2021-10-24 17:11:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 19:50:24 +0800
 * @LastEditors : JackChou
 */
import * as superagent from 'superagent'
import path from 'path'
import fs from 'fs'
import { Movie } from './types'
import MovieAnalyzer from './MovieAnalyzer'
class Crawler {
  constructor(private url: string, private analyzer: any, private filepath: string) {
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

const url = 'https://movie.douban.com/cinema/nowplaying/chengdu/'
const filepath = path.join(__dirname, '../data/playing.json')

const crawler = new Crawler(url, movieAnalyzer, filepath)
