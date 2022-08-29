const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
const API =
  'http://books.toscrape.com/catalogue/category/books/mystery_3/index.html'
const scrapperScript = async () => {
  try {
    const { data } = await axios.get(API)
    const $ = cheerio.load(data)
    const DataBooks = $('.row li .product_pod')
    const scrapedData = []
    DataBooks.each((index, el) => {
      const scrapItem = { title: '', price: '' }
      scrapItem.title = $(el).children('h3').text()
      scrapItem.price = $(el)
        .children('.product_price')
        .children('p.price_color')
        .text()
      scrapedData.push(scrapItem)
    })
    console.dir(scrapedData)
    fs.writeFile(
      'scrapedBooks.json',
      JSON.stringify(scrapedData, null, 2),
      (e) => {
        if (e) {
          console.log(e)
          return
        }
        console.log('Scraping completed.')
      },
    )
  } catch (error) {
    console.error(error)
  }
}
scrapperScript()