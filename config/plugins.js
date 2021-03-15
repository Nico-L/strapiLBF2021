const SENDGRID_API_KEY = process.env.SENDGRID_API

module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: SENDGRID_API_KEY,
    },
    settings: {
      defaultFrom: 'atelier@labonnefabrique.fr',
      defaultReplyTo: 'atelier@labonnefabrique.fr',
    },
  },
  // ...
});

