export default {
  application: {
    port: process.env.EGAP_APP_PORT || 3000
  },
  api: {
    port: process.env.EGAP_API_PORT || 6000
  }
};
