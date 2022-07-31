var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 人狼ゲーム
var index_wereWolf = require("./routes/wereWolf/index");
var members_wereWolf = require("./routes/wereWolf/members");
var jobs_wereWolf = require("./routes/wereWolf/jobs");
var talks_wereWolf = require("./routes/wereWolf/talks");
var functions_wereWolf = require("./routes/wereWolf/functions");
var login_wereWolf = require("./routes/wereWolf/login");
var phase_wereWolf = require("./routes/wereWolf/phase");
var infomations_wereWolf = require("./routes/wereWolf/infomations");

// カウントゲーム
var index_countGame = require("./routes/countGame/index");
var functions_countGame = require("./routes/countGame/functions");
var members_countGame = require("./routes/countGame/members");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 人狼ゲーム
app.use("/wereWolf/", index_wereWolf);
app.use("/wereWolf/functions", functions_wereWolf);
app.use("/wereWolf/jobs", jobs_wereWolf);
app.use("/wereWolf/login", login_wereWolf);
app.use("/wereWolf/members", members_wereWolf);
app.use("/wereWolf/phase", phase_wereWolf);
app.use("/wereWolf/talks", talks_wereWolf);
app.use("/wereWolf/infomations", infomations_wereWolf);

// カウントゲーム
app.use("/countGame/", index_countGame);
app.use("/countGame/functions", functions_countGame);
app.use("/countGame/members", members_countGame);

// 404をキャッチし、エラーハンドラへ転送する
app.use(function (req, res, next) {
  next(createError(404));
});

// エラーハンドラ
app.use(function (err, req, res, next) {
  // ローカルに設定し、開発時のエラーのみ提供
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // エラーページのレンダリング
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
