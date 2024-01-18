const express = require('express');
const bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client');

const { registerTreeController } = require('./controller/tree')
const { registerTableController } = require('./controller/table')

const prisma = new PrismaClient();
const app = express();

const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// danger: cors
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有站点访问
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的请求方法
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // 允许的请求头
//   next(); // 继续处理下一个中间件或路由处理程序
// })

// root for test
app.get('/', async (req, res) => {
  res.json({
    code: 200,
    msg: 'hello world',
  })
});

// 注册路由控制器
registerTreeController(app, prisma)
registerTableController(app, prisma)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
