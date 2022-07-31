var express = require("express");
var router = express.Router();
var database = require("./database_countGame");

// 配列をシャッフル
function arrayShuffle(array) {
  for (var i = array.length - 1; 0 < i; i--) {
    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));
    // 要素の並び替えを実行
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

// 機能 - 順番振分け機能
router.get("/allocate", function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");
  (async () => {
    const conn = await database.getConnection();

    // メンバー数取得
    const memberRows = await conn.query("SELECT id FROM members");
    const memberCnt = memberRows.length;

    // 順番リセット
    await conn.query("update members set sequential = 0");

    //順番をシャッフルする
    var jobListText = [];
    for (let i = 0; i < memberRows.length; i++) {
      jobListText.push(memberRows[i].id);
    }
    for (var i = 0; i < Math.floor(Math.random() * 21); i++) {
      jobListText = arrayShuffle(jobListText);
    }

    // 順番更新
    for (let i = 0; i < memberCnt; i++) {
      const jobUpdate = `update members set sequential = ${i + 1} where id = ${
        jobListText[i]
      }`;
      await conn.query(jobUpdate);
    }
    await conn.release();
    res.send(`{"state":"Success"}`);
  })().catch(next);
});

module.exports = router;
