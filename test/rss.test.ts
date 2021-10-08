const expect = require('chai').expect
const nock = require('nock')
const axios = require('axios')
const pullChanges = require('../src/backend/rss').pullChanges
const fs = require('fs')

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
  it('should retrieve RSS feed from a given URL', async () => {
    await pullChanges('https://woojiahao.github.io/rss.xml')
  })
})
