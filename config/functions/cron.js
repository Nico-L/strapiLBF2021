'use strict';
const fetch = require('node-fetch');

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  '00 05 00 * * *': async () => {
    const now = new Date();
    const users = await strapi.plugins['users-permissions'].services.user.fetchAll({doitEtreEfface: true, dateEffacement_lt: now});

    users.forEach(async (user) => {
      strapi.log.info('user effacé: ', user.username)
      await strapi.plugins['users-permissions'].services.user.remove({id: user.id})
    })
  },
  '00 00 00 * * *': () => {
    fetch(process.env.HOOK_ATELIER, {
        method: 'POST',
        headers: {},
        body: ''
      }).then((retour)=> {
		strapi.log.info('Netlify build launched');
      })
  }
};
