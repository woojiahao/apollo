const expect = require('chai').expect
const nock = require('nock')
const axios = require('axios')
const pullChanges = require('../src/backend/rss').pullChanges

describe('pullChanges', () => {
  beforeEach(() => {
    nock('https://woojiahao.github.io')
      .get('/rss.xml')
      .reply(200, `
      <html>
      </html>
      `)
  })
  it('should retrieve RSS feed from a given URL', async () => {
    axios.get('https://woojiahao.github.io/rss.xml').then(res => console.log(res.data))
  })
})
