/*
 * @Description : 类型定义
 * @Date        : 2021-10-24 18:15:44 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 18:41:17 +0800
 * @LastEditors : JackChou
 */

type MovieStringKey = Record<
  'poster' | 'title' | 'region' | 'director' | 'actors' | 'category' | 'enough' | 'showed',
  string
>
type MovieNumberKey = Record<'release' | 'star' | 'votecount' | 'subject', number>

export type Movie = MovieStringKey & MovieNumberKey
