import { RSS } from "../src/main/rss/data"

const expect = require('chai').expect
const nock = require('nock')
const pullChanges = require('../src/main/rss/rss').loadFeed
const fs = require('fs')

const expectDate = (date: Date, expectedDate: number, expectedMonth: number, expectedYear: number) => {
  expect(date.getUTCDate()).to.equal(expectedDate, 'date is wrong')
  expect(date.getUTCMonth()).to.equal(expectedMonth, 'month is wrong')
  expect(date.getUTCFullYear()).to.equal(expectedYear, 'year is wrong')
}

describe('pullChanges', () => {
  beforeEach(() => {
    let mockRSS: string
    try {
      mockRSS = fs.readFileSync(__dirname + '/res/rss.xml', 'utf8')
    } catch (err) {
      throw err
    }
    nock('https://woojiahao.github.io')
      .get('/rss.xml')
      .reply(200, mockRSS)
  })

  it('parses feed pubDate as a Date object', async () => {
    const results: RSS.Feed = await pullChanges('https://woojiahao.github.io/rss.xml')
    expectDate(results.pubDate, 19, 4, 2002)
  })


  it('parses feed lastBuildDate as a Date object', async () => {
    const results: RSS.Feed = await pullChanges('https://woojiahao.github.io/rss.xml')
    expectDate(results.lastBuildDate, 8, 9, 2021)
  })

  it('parses item pubDate as a Date object', async () => {
    const results: RSS.Feed = await pullChanges('https://woojiahao.github.io/rss.xml')
    expectDate(results.items[0].pubDate, 19, 4, 2002)
  })

  it('parses ttl as an integer', async () => {
    const results: RSS.Feed = await pullChanges('https://woojiahao.github.io/rss.xml')
    expect(results.ttl).to.equal(67)
  })

  it('parses skipHours as an integer', async () => {
    const results: RSS.Feed = await pullChanges('https://woojiahao.github.io/rss.xml')
    expect(results.skipHours, 6)
  })

  it('parses skipDays as an integer', async () => {
    const results: RSS.Feed = await pullChanges('https://woojiahao.github.io/rss.xml')
    expect(results.skipDays, 2)
  })
})
