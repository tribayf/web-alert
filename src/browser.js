'use strict'

const puppeteer = require('puppeteer')

module.exports = class Browser
{
  static browser = null
  static page    = null

  static async launch(config = {})
  {
    if (! (this.browser = await launchBrowser(config)))
      throw new Error('failed to launch browser')

    if (! (this.page = await openNewPage(this.browser)))
      throw new Error('failed to open new page')
  }

  static async destroy()
  {
    if (!!this.browser) {
      await closeBrowser(this.browser)
      this.browser = null
    }
  }

  static async openNewPage(location)
  {
    const page = await openNewPage(this.browser)

    if (!page) throw new Error('failed to open new page')

    if (!!location)
      await navigateToLocation(page, location)

    return page
  }

  static async navigateToLocation(page, location)
  {
    await navigateToLocation(page, location)
    return page
  }

  static async refreshPage(page)
  {
    await refreshPage(page)
    return page
  }
}


/* ------------------------------------------------------------------------------------ *\
   Functions
\* ------------------------------------------------------------------------------------ */

async function launchBrowser(cnf)
{
  const browser = await puppeteer.launch(cnf || {})
  return browser
}

async function closeBrowser(browser)
{
  await browser.close()
}

async function openNewPage(browser)
{
  return await browser.newPage()
}

async function navigateToLocation(page, location)
{
  await page.goto(location)
  return page
}

async function refreshPage(page)
{
  await page.reload()
  return page
}

async function closePage(page)
{
  await page.close()
}

async function sendEmailAlert(body)
{
  throw new Error('not implemented!')
}

async function getPageHTML(page)
{
  const data = await page.evaluate(_ => {
    function doctype(document) {
      // credit: https://stackoverflow.com/a/10162353
      var node = document.doctype
      return "<!DOCTYPE "
            + node.name
            + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
            + (!node.publicId && node.systemId ? ' SYSTEM' : '')
            + (node.systemId ? ' "' + node.systemId + '"' : '')
            + '>'
    }
    return doctype(document)
         + document.head.outerHTML
         + document.body.outerHTML
  })
  return { data }
}
