/*
 * @Description : 提取电影信息
 * @Date        : 2021-10-24 19:17:34 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 19:43:40 +0800
 * @LastEditors : JackChou
 */
import * as cheerio from 'cheerio'
import fs from 'fs'
import { Movie } from './types'

export default class MovieAnalyzer {
  getMovieInfo(htmlCode: string, dataFilepath: string): Movie[] {
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

    return this.generateMovieList(movieList, dataFilepath)
  }

  private generateMovieList(movies: Movie[], oldFilepath: string) {
    if (!fs.existsSync(oldFilepath)) {
      return movies
    }
    let playingMovies: Movie[] = JSON.parse(fs.readFileSync(oldFilepath, 'utf-8')) // 读取文件
    const newMovies = movies.filter(movie => {
      const exist = playingMovies.find(item => item.poster === movie.poster && item.title === movie.title) // 判断是否存在
      return !exist
    })
    playingMovies.push(...newMovies)
    return playingMovies
  }
}
