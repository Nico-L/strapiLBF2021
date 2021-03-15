const axios = require('axios');
const pixabayKey = process.env.PIXABAY_KEY

module.exports = {
  async fetch(ctx) {
    const args = ctx.request.body
    const { data } = await axios({
      method: 'get',
      url: 'https://pixabay.com/api/',
      data: {
        key: pixabayKey,
        ...args
      }
    });

    console.log(data);
    return {data: data}
  }
}
