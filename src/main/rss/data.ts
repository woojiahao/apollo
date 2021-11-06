export namespace RSS {
  export type Feed = {
    title: string
    readonly description: string
    readonly link: string
    readonly items: Array<Item>

    readonly language: string | null
    readonly copyright: string | null
    readonly pubDate: Date | null
    readonly lastBuildDate: Date | null
    readonly categories: Array<string>
    // readonly cloud: Cloud | null
    readonly ttl: number | null
    readonly image: Image | null
    readonly skipHours: number | null
    readonly skipDays: number | null
  }

  export type Item = {
    readonly title: string
    readonly link: string
    readonly description: string

    readonly content: string | null
    readonly author: string | null
    readonly categories: Array<string>
    readonly comments: string | null
    readonly enclosure: Enclosure | null
    readonly guid: string | null
    readonly pubDate: Date | null
  }

  // export type Cloud = {
  //   readonly domain: string
  //   readonly port: number
  //   readonly path: string
  //   readonly registerProcedure: string
  //   readonly protocol: string
  // }

  export type Image = {
    readonly url: string
    readonly title: string
    readonly link: string
    readonly width: number | null
    readonly height: number | null
    readonly description: string | null
  }

  export type Enclosure = {
    readonly url: string
    readonly length: number
    readonly type: string
  }

  export type TagFeeds = {
    [tag: string]: {
      feedTitle: string
      rssUrl: string
      articles: {
        articleTitle: string
        articleId: number
      }[]
    }[]
  }
}
