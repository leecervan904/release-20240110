const express = require('express');
const { initTableData } = require('../db')

/**
 * @param {import('express').Application} app
 * @param {import('@prisma/client').PrismaClient} prisma - Prisma 数据库客户端实例
 */
function registerTableController(app, prisma) {
  const router = express.Router()

  router.get('/table', async (req, res) => {
    const data = await prisma.tree.findMany({
      include: {
        children: {
          include: {
            children: true,
          }
        }
      }
    })

    res.json(buildTree(data))
  })

  app.use('/', router)
}

module.exports = {
  registerTableController
}
