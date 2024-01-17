const express = require('express');
const bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client');

const { registerTreeController } = require('./controller/tree')

const prisma = new PrismaClient();
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = 3000;

app.get('/', async (req, res) => {
  res.json({
    code: 200,
    msg: 'hello world',
  })
});

registerTreeController(app, prisma)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
