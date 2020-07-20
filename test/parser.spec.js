'use strict'

const result = require('dotenv').config()
if (result.error) throw result.error

const fs = require('fs')
const html = fs.readFileSync(`${__dirname}/${process.env.TEST_PAGE}`)

const jsdom  = require('jsdom')
const { JSDOM } = jsdom
const { document } = new JSDOM(html).window

const Parser = require(`../src/${process.env.PARSER_PATH}`)

describe('Parser', function() {

  it('can parse the html document', async function(done) {
    const result = await Parser.parse(document)

    expect(result).toEqual(process.env.TEST_RESULT)

    done()
  })

})