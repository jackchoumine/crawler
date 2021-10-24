/*
 * @Description : 爬虫类
 * @Date        : 2021-10-24 17:11:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 19:05:09 +0800
 * @LastEditors : JackChou
 */
import * as superagent from 'superagent'
import * as cheerio from 'cheerio'
import path from 'path'
import fs from 'fs'
import { Movie } from './types'
class Crawler {
  private url = 'https://movie.douban.com/cinema/nowplaying/chengdu/'

  constructor() {
    this.initSpider()
  }

  async initSpider() {
    const html = await this.getRawHtml()
    const movieList = this.getMovieInfo(html)
    this.saveToJSON(movieList)
  }

  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  saveToJSON(movies: Movie[]) {
    const dataPath = path.resolve(__dirname, '../data/playing.json')
    let playingMovies: Movie[] = []
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify(movies))
      return true
    }
    playingMovies = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) // 读取文件
    const newMovies = movies.filter(movie => {
      const exist = playingMovies.find(item => item.poster === movie.poster && item.title === movie.title) // 判断是否存在
      return !exist
    })
    playingMovies.push(...newMovies)
    fs.writeFileSync(dataPath, JSON.stringify(playingMovies)) // 写入文件
    return true
  }
  getMovieInfo(htmlCode: string): Movie[] {
    const $ = cheerio.load(htmlCode)
    const playing = $('#nowplaying')
    const list = playing.find('.lists')
    const movieList: Movie[] = []
    list.children().each((index, element) => {
      const cheerioObj = $(element)
      const poster = cheerioObj.find('.poster').find('img').attr('src')
      const movie = cheerioObj.data()
      movieList.push({ poster: poster, ...movie })
    })
    return movieList
  }
}
const crawler = new Crawler()
