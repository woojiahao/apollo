/***
 * Backend for the RSS to retrieve RSS feed
 * TODO: Custom refresh time/interval
 */
import Parser from "rss-parser"

const parser = new Parser()

export const pullChanges = async (url: string) => {
  (async () => {
    const feed = await parser.parseURL(url)
    console.log(feed.title)

    feed.items.forEach(item => {
      console.log(JSON.stringify(item))
    })
  })
}

