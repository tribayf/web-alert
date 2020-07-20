'use strict'

const result = require('dotenv').config()
if (result.error) throw result.error

const Browser = require('../src/browser')
const { parseBool } = require('../src/util')

describe('Browser', function() {

  const url = 'https://www.google.com/'

  const config = {
    headless: parseBool(process.env.RUN_HEADLESS),
    timeout:  parseInt(process.env.TIME_TO_WAIT),
  }

  it('can be launched', async function(done) {
    try
    {
      await Browser.launch(config)

      const result = Browser.browser != null
      expect(result).toBe(true)
    }
    catch (e)
    {
      console.error(e)
    }
    finally
    {
      await Browser.destroy()
      done()
    }
  })


  it('can open new page', async function(done) {
    try
    {
      await Browser.launch(config)
      const page = await Browser.openNewPage()

      expect(page).not.toEqual(null)
    }
    catch (e)
    {
      console.error(e)
    }
    finally
    {
      await Browser.destroy()
      done()
    }
  })


  it('can navigate to location', async function(done) {
    try
    {
      await Browser.launch(config)
      const page = await Browser.openNewPage()
      await Browser.navigateToLocation(page/* via jest-puppeteer */, url)

      const result = await page.title()
      expect(result).toEqual('Google')
    }
    catch (e)
    {
      console.error(e)
    }
    finally
    {
      await Browser.destroy()
      done()
    }
  })


  it('can open new page with url', async function(done) {
    try
    {
      await Browser.launch(config)
      const page = await Browser.openNewPage(url)

      const result = await page.title()
      expect(result).toEqual('Google')
    }
    catch (e)
    {
      console.error(e)
    }
    finally
    {
      await Browser.destroy()
      done()
    }
  })

})