/***
 * Backend for the RSS to retrieve RSS feed
 * TODO: Custom refresh time/interval
 * TODO: Parse cloud option
 */
import Parser from "rss-parser"
import { RSS } from './data'

const parser = new Parser()

export const pullChanges = async (url: string) => {
  return (async () => {
    // TODO: Parse into custom objects to restrict content to display
    const feed = await parser.parseURL(url)
    const parsedFeed = parseFeed(feed)
    return parsedFeed
  })()
}

const parseFeed = (feed: any): RSS.Feed => {
  const f: RSS.Feed = {
    title: feed.title,
    link: feed.link,
    description: feed.description,
    items: getValue<Array<any>, Array<RSS.Item>>(feed, 'items', (v) => parseItems(v), []),
    language: getValue<string, string | null>(feed, 'language', nothing, null),
    copyright: getValue<string, string | null>(feed, 'copyright', nothing, null),
    pubDate: getValue<string, Date | null>(feed, 'pubDate', (v) => new Date(v), null),
    lastBuildDate: getValue<string, Date | null>(feed, 'lastBuildDate', (v) => new Date(v), null),
    categories: getValue<Array<string>, Array<string>>(feed, 'categories', nothing, []),
    ttl: getValue<string, number | null>(feed, 'ttl', (v) => parseInt(v), null),
    image: getValue<any, RSS.Image | null>(feed, 'image', (v) => parseImage(v), null),
    skipHours: getValue<string, number | null>(feed, 'skipHours', (v) => parseInt(v), null),
    skipDays: getValue<string, number | null>(feed, 'skipDays', (v) => parseInt(v), null)
  }

  return f
}

const parseImage = (image: any): RSS.Image => {
  const i: RSS.Image = {
    link: image['link'],
    url: image['url'],
    title: image['title'],
    width: getValue<number, number>(image, 'width', nothing, 88),
    height: getValue<number, number>(image, 'height', nothing, 31),
    description: getValue<string, string | null>(image, 'description', nothing, null)
  }
  return i
}

const parseItems = (items: Array<any>): Array<RSS.Item> => {
  const is: Array<RSS.Item> = items.map(item => parseItem(item))
  return is
}

const parseItem = (item: any): RSS.Item => {
  const i: RSS.Item = {
    title: item.title,
    link: item.link,
    description: item.content,
    content: getValue<string, string | null>(item, 'content:encoded', nothing, null),
    author: getValue<string, string | null>(item, 'author', nothing, null),
    categories: getValue<Array<string>, Array<string>>(item, 'categories', nothing, []),
    comments: getValue<string, string | null>(item, 'comments', nothing, null),
    enclosure: getValue<any, RSS.Enclosure | null>(item, 'enclosure', (v) => parseEnclosure(v), null),
    guid: getValue<string, string | null>(item, 'guid', nothing, null),
    pubDate: getValue<string, Date | null>(item, 'pubDate', v => new Date(v), null)
  }

  return i
}

const parseEnclosure = (enclosure: any): RSS.Enclosure => {
  const e: RSS.Enclosure = {
    url: enclosure.url,
    length: parseInt(enclosure.length),
    type: enclosure.type
  }

  return e
}

const getValue = <T extends any, R extends any>(obj: any, key: string, parse: (v: T) => R, otherwise: R): R => {
  return obj[key] ? parse(obj[key]) : otherwise
}

const nothing = (i: any) => i

