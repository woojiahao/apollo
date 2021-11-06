import { getConnection, IsNull } from "typeorm";
import { RSS } from "../../rss/data";
import { Feed } from "../entities/Feed";

export async function getAvailableFeedsToTagFeeds(): Promise<RSS.TagFeeds> {
  const feedRepository = getConnection().getRepository(Feed)
  const allAvailableFeed = await feedRepository.find({
    where: {
      tag: { deletedOn: IsNull() }
    },
    relations: ["tag", "articles"]
  })

  const tagFeeds: RSS.TagFeeds = {}

  for (const f of allAvailableFeed) {
    const tag = !f.tag ? 'Uncategorized' : f.tag.tagName
    const feedTitle = f.feedTitle
    const rssUrl = f.rssUrl
    if (!(tag in tagFeeds)) {
      tagFeeds[tag] = []
    }

    const articles = !f.articles ? [] : f.articles.map(a => {
      return { articleTitle: a.articleTitle, articleId: a.articleId }
    })

    tagFeeds[tag].push({ feedTitle, rssUrl, articles })
  }

  if (!('Uncategorized' in tagFeeds)) {
    tagFeeds['Uncategorized'] = []
  }

  return tagFeeds
}