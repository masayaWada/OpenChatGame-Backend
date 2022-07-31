// DB接続情報を定義
const mariadb = require("mariadb");
const config = require("./../../public/conf/config.json");
const pool = mariadb.createPool({
  host: config.database_info.WereWolfGame.host,
  port: config.database_info.WereWolfGame.port,
  user: config.database_info.WereWolfGame.user,
  password: config.database_info.WereWolfGame.password,
  database: config.database_info.WereWolfGame.database,
  connectionLimit: config.database_info.WereWolfGame.connectionLimit,
});

module.exports = pool;
