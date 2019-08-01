import { BitlyClient } from "bitly"

const createShortLink = async (url: string): Promise<string> => {
  const ACCESS_TOKEN: any = process.env.BITLY_TOKEN
  const bitly = new BitlyClient(ACCESS_TOKEN, {})
  let response
  try {
    response = bitly.shorten(url)
  } catch (err) {
    throw new Error(err.message)
  }
  return response
}

export default createShortLink
