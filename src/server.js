'use strict'

const result = require('dotenv').config()
if (result.error) throw result.error

const Browser = require('./browser')
const Parser  = require('./parser')
const { parseBool, timeout } = require('./util')


/* ------------------------------------------------------------------------------------ *\
   Functions
\* ------------------------------------------------------------------------------------ */

async function startTracking(browser)
{
  console.log('tracking...')

  const page = await browser.navigateToLocation(process.env.URL)

  console.log(page)

  await timeout(5000) // allow time for page to fully load

  const doc = await page.evaluate(_ => document)

  const result = await Parser.parse(doc)

  console.log(result.data)
}


/* ------------------------------------------------------------------------------------ *\
   Main
\* ------------------------------------------------------------------------------------ */

;(async () => {

  Promise.resolve()
    .then(async _ => {

      console.log('launching browser...')

      await Browser.launch({
        headless: parseBool(process.env.RUN_HEADLESS),
        timeout:  parseInt(process.env.TIME_TO_WAIT),
      })
    })

    .then(async _ => { await startTracking(Browser) })

    .catch(error => { console.error(error) })

    .finally(async _ => {
      console.log('terminating...')
      await Browser.destroy()
    })

})()
