var express = require("express");
var router = express.Router();
var database = require("./database_countGame");

// メンバー - 一覧取得
router.get("/get", function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");
  const sql = "SELECT id,name,sequential FROM members ORDER BY sequential";
  (async () => {
    const conn = await database.getConnection();
    const Rows = await conn.query(sql);
    await conn.release();
    res.send(Rows);
  })().catch(next);
});

// メンバー - メンバー追加
router.get("/add/:name", function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");
  const name = req.params.name;
  const sql = `INSERT INTO members (name) VALUES('${name}')`;
  (async () => {
    const conn = await database.getConnection();
    await conn.query(sql);
    await conn.release();
    res.send(`{"state":"Success"}`);
  })().catch(next);
});

// メンバー - メンバー削除
router.get("/delete/:id", function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");
  const id = req.params.id;
  const sql = `DELETE FROM members WHERE id=${id}`;
  (async () => {
    const conn = await database.getConnection();
    await conn.query(sql);
    await conn.release();
    res.send(`{"state":"Success"}`);
  })().catch(next);
});

module.exports = router;
