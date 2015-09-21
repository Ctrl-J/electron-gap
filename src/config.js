module.exports = {
  db: {
    username: process.env.EGAP_DB_USER || 'node',
    password: process.env.EGAP_DB_PASSWORD || 'TestDatabasePassword',
    address: process.env.EGAP_DB_ADDRESS || 'localhost',
    database: 'electrongap'
  },
  api: {
    port: 3000
  },
  web: {
    port: 4000
  }
};
