/***
 * Backend for the RSS to retrieve RSS feed
 * TODO: Custom refresh time/interval
 * TODO: Parse cloud option
 * TODO: Support Atom
 */
import parse from 'node-html-parser'
import Parser from "rss-parser"
import { RSS } from './data'

const rssParser = new Parser()

export async function loadFeed(url: string): Promise<RSS.Feed> {
  const feed = await rssParser.parseURL(url)
  const parsedFeed = parseFeed(feed)

  /// Parse each article to resolve any relative image paths
  const rootPath = parsedFeed.link
  parsedFeed.items = parsedFeed.items.map(item => resolveContentImagePaths(rootPath, item))

  return parsedFeed
}

function resolveContentImagePaths(rootPath: string, item: RSS.Item): RSS.Item {
  if (!item.content) return item
  const parsedDOM = parse(item.content)

  parsedDOM.getElementsByTagName('img')
    .filter(img => !isAbsoluteURL(img.getAttribute('src')))
    .forEach(img => {
      const originalAssetPath = img.getAttribute('src')
      const absolutePath = new URL(originalAssetPath, rootPath).href
      img.setAttribute('src', absolutePath)

      if (img.hasAttribute('srcset')) {
        const srcSet = img.getAttribute('srcset')
        const updatedSrcSet = srcSet
          .split(',\n')
          .map(s => {
            const [assetPath, width] = s.split(' ')
            return [new URL(assetPath, rootPath).href, width].join(' ')
          })
          .join(',')
        img.setAttribute('srcset', updatedSrcSet)
      }
    })

  parsedDOM.getElementsByTagName('a')
    .filter(a => !isAbsoluteURL(a.getAttribute('href')))
    .forEach(a => {
      const originalAssetPath = a.getAttribute('href')
      const absolutePath = new URL(originalAssetPath, rootPath).href
      a.setAttribute('href', absolutePath)
    })

  const newItem = Object.assign({}, item)
  newItem.content = parsedDOM.toString()

  return newItem
}

function isAbsoluteURL(url: string): boolean {
  return url && (url.startsWith('http://') || url.startsWith('https://'))
}

function parseFeed(feed: any): RSS.Feed {
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

function parseImage(image: any): RSS.Image {
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

function parseItems(items: Array<any>): Array<RSS.Item> {
  const is: Array<RSS.Item> = items.map(item => parseItem(item))
  return is
}

function parseItem(item: any): RSS.Item {
  const i: RSS.Item = {
    title: item.title,
    link: item.link,
    description: item.content,
    content: getValue<string, string | null>(item, 'content:encoded', (v) => `<div>${v}</div>`, null),
    author: getValue<string, string | null>(item, 'author', nothing, null),
    categories: getValue<Array<string>, Array<string>>(item, 'categories', nothing, []),
    comments: getValue<string, string | null>(item, 'comments', nothing, null),
    enclosure: getValue<any, RSS.Enclosure | null>(item, 'enclosure', (v) => parseEnclosure(v), null),
    guid: getValue<string, string | null>(item, 'guid', nothing, null),
    pubDate: getValue<string, Date | null>(item, 'pubDate', v => new Date(v), null)
  }

  return i
}

function parseEnclosure(enclosure: any): RSS.Enclosure {
  const e: RSS.Enclosure = {
    url: enclosure.url,
    length: parseInt(enclosure.length),
    type: enclosure.type
  }

  return e
}

function getValue<T extends any, R extends any>(obj: any, key: string, parse: (v: T) => R, otherwise: R): R {
  return obj[key] ? parse(obj[key]) : otherwise
}

function nothing(i: any) {
  return i
}

