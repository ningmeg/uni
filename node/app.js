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
  // console.log(req.query);
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
// /GetYonghu 接口是用户及购物车信息

app.get("/GetYonghu", async function (req, res) {
  let id = req.query.id,
    name = req.query.name,
    font = req.query.font,
    num = 0;
  console.log(req.query);
  let trans = await db.useTransaction();

  try {
    // 开启事务

    let result = await db
      .select("*")
      .from("yonghu")
      .where("id", id, "name", name)
      .queryList();

    if (result.length > 0) {
      num = result[0].purchase;

      if (font === "1") {
        num++;
      } else {
        num--;
      }

      console.log(num);
      let task = {
        purchase: num,
      };

      // 在事务中执行更新操作
      await trans
        .update("yonghu", task)
        .where("id", id, "name", name)
        .execute();
      await trans
        .update("detaileddata", task)
        .where("id", id, "name", name)
        .execute();

      // 提交事务
      await trans.commit();

      console.log("事务提交成功");
      res.sendStatus(200);
    } else {
      console.log("未找到符合条件的数据");
    }
  } catch (error) {
    console.log(error);
    // 发生错误时回滚事务
    if (trans) {
      await trans.rollback();
    }
  }
});
// /Sum 计算所有购买
app.get("/Sum", async function (req, res) {
  try {
    let sum = await db.select("purchase").from("yonghu").queryList();
    let purchaseValues = sum.map((row) => row.purchase),
      sums = purchaseValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    res.send({ sum: sums });
    console.log(sums);
  } catch (error) {
    console.log(error);
  }
});
// /ShouCang 商品收藏逻辑
app.get("/ShouCang", async function (req, res) {
  try {
    let id = req.query.id,
      name = req.query.name,
      bor = 1,
      collection = await db
        .select("collection")
        .from("yonghu")
        .where("id", id, "name", name)
        .queryList();
    console.log(collection[0].collection);
    if (collection[0].collection === 1) {
      bor = 0;
    } else {
      bor = 1;
    }
    let tank = {
      collection: bor,
    };
    let select = await db
      .update("yonghu", tank)
      .where("id", id, "name", name)
      .execute();

    res.send({ collection });
  } catch (error) {
    console.log(error);
  }
});
// /ShouCang 商品收藏查看
app.get("/ShouCangChaKan", async function (req, res) {
  try {
    let id = req.query.id,
      name = req.query.name,
      collection = await db
        .select('*')
        .from("yonghu")
        .queryList();
    console.log(collection);
    res.send({ collection });
  } catch (error) {
    console.log(error);
  }
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://127.0.0.1:" + port);
});
