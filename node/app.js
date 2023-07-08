const express = require("express");
const DbClient = require("ali-mysql-client");
const db = new DbClient({
  host: "127.0.0.1",
  user: "root",
  password: "HH30291475xy/",
  database: "my_db",
});
var app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 允许所有来源的请求访问该接口，可以根据需求进行调整
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // 允许的请求方法
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, custom-header"); // 允许的请求头
  next();
});

// listData接口主页是全部商品的大概信息
app.get("/listData", async function (req, res) {
  // console.log(req.query);
  let getlistdata = new getListsData(req, res);
  if (req.query.text === "全部") {
    await getlistdata.QueryAllData();
  } else if (req.query.text === "热门") {
    await getlistdata.HotData();
  }
});

class getListsData {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async QueryAllData() {
    try {
      let result = await db.select("*").from("data_1").queryList();
      this.res.send(result);
    } catch (error) {
      // 处理错误并发送适当的错误响应
      this.res.status(500).send("请求超时");
    }
  }
  async HotData() {
    try {
      let result = await db
        .select("*")
        .from("data_1")
        .orderby("inventory desc")
        .queryList();
      this.res.send(result);
    } catch (error) {
      // 处理错误并发送适当的错误响应
      this.res.status(500).send("请求超时");
    }
  }
}
// /list/listsdata接口主页是全部商品的详细信息
app.get("/list/listsdata", async function (req, res) {
  console.log(req.query);
  let id = req.query.id,
    name = req.query.name;
  try {
    let result = await db
    .select("*")
    .from("detaileddata")
    .where("id", id, "name", name)
    .queryList();
    res.send(result);
  } catch {}
});
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://127.0.0.1:" + port);
});
