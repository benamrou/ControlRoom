module.exports = {
  log: "error",
  redis: {
    url: process.env.REDIS_URL
  },
  db: {
    maxRows: 20000,
    provider: "oracledb",
    connAttrs: {
          "user": "roomprod",
          "password": "roomprod",
          "connectString": "vps145391.vps.ovh.ca/croom.vps.ovh.ca",
          "poolMin": 1,
          "poolMax": 20,
          "poolTimeout": 60,
          "maxRows": 20000,
          "autocommit"  : true,   // default is false
          "_enableStats"  : true,   // default is false
          "queueRequests": false,
          "queueTimeout": 10000, // 60 seconds
          "stmtCacheSize": 40
        }
  }
};