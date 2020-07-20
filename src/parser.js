'use strict'

const ParserImpl = require('./parser-impl')

module.exports = class Parser
{
  static async parse(doc, sendAlertWithText)
  {
    const result = await ParserImpl.parse(doc)

    if (result.error)
      throw new Error(result.error)

    const text = await ParserImpl.getFormattedText(result.data)

    if (ParserImpl.shouldAlert && sendAlertWithText)
      sendAlertWithText(text)

    return text
  }
}
