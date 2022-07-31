// DB接続情報を定義
const mariadb = require("mariadb");
const config = require("./../../public/conf/config.json");
const pool = mariadb.createPool({
  host: config.database_info.CountGame.host,
  port: config.database_info.CountGame.port,
  user: config.database_info.CountGame.user,
  password: config.database_info.CountGame.password,
  database: config.database_info.CountGame.database,
  connectionLimit: config.database_info.CountGame.connectionLimit,
});

module.exports = pool;
