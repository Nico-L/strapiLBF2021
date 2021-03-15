const fetchMetaData = require('meta-fetcher');

module.exports = {
	getMetadata: async function(ctx) {
		// get url from the POST request
    		const {url} = ctx.request.body;

    		// check url requirement
    		if (!url) {
      			return ctx.badRequest('`url` param is missing')
    		}
		
		try {
     			 // decrypt the jwt
			const lesMeta = await fetchMetaData(url)
			var retour = {
				success: 1,
				meta: {
					"title": lesMeta.basic_metadata.title,
					"description": lesMeta.basic_metadata.description,
					"favicons": lesMeta.favicons,
					"image" : {
						"url" : lesMeta.opengraph["og:image"]
					}
				}
			}
			// send the decrypted object
			return retour;
		} catch (err) {
			// if there is an error
			return ctx.badRequest(err.toString());
		}
	}
}
