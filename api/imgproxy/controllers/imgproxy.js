const createHmac = require('create-hmac')

const KEY = process.env.IMGPROXY_KEY
const SALT = process.env.IMGPROXY_SALT

module.exports = {
  async url(ctx) {
    const args = ctx.request.body
    const urlSafeBase64 = (string) => {
      return Buffer.from(string).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
      }
    const hexDecode = (hex) => Buffer.from(hex, 'hex')

    const sign = (salt, target, secret) => {
    const hmac = createHmac('sha256', hexDecode(secret))
      hmac.update(hexDecode(salt))
      hmac.update(target)
      return urlSafeBase64(hmac.digest())
      }

    const enlarge = 1
    const encoded_url = urlSafeBase64(args.url)
    const path = `/${args.resizing_type}/${args.width}/${args.height}/${args.gravity}/${enlarge}/${encoded_url}`//.${extension}`

    const signature = sign(SALT, path, KEY)
    return {
      imgProxyUrl: `https://imgproxy.labonnefabrique.fr/${signature}${path}`
    }
  },
};
