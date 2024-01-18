const express = require('express');
const { initTreeData, buildTree } = require('../db')

/**
 * @param {import('express').Application} app
 * @param {import('@prisma/client').PrismaClient} prisma - Prisma 数据库客户端实例
 */
function registerTreeController(app, prisma) {
  const router = express.Router()

  router.get('/tree/node', async (req, res) => {
    console.log(req.query, 'params');
    const { id } = req.query

    const data = await prisma.tree.findUnique({
      where: { id: +id }
    })

    res.json(data)
  })

  router.get('/tree', async (req, res) => {
    const data = await prisma.tree.findMany({
      include: {
        children: {
          include: {
            children: true,
          }
        }
      },
    })

    res.json({
      code: 200,
      msg: 'success',
      data: buildTree(data),
    })
  })

  router.get('/tree/init', async (req, res) => {
    const data = await initTreeData(prisma)

    res.json({
      code: 200,
      msg: 'success',
      data,
    })
  })

  router.post('/tree/node/create', async (req, res) => {
    const { title, content, parentId } = req.body

    const data = await prisma.tree.create({
      data: { title, content, parentId: parentId != null ? +parentId : null }
    })

    res.json({
      code: 200,
      msg: 'success',
      data,
    })
  })

  router.post('/tree/node/delete', async (req, res) => {
    const { id } = req.body

    const data = await prisma.tree.delete({
      where: { id }
    })

    res.json({
      code: 200,
      msg: 'success',
      data,
    })
  })

  router.post('/tree/node/update', async (req, res) => {
    const { id, ...rest } = req.body

    if (rest.parentId != null) {
      rest.parentId = +rest.parentId
    }

    const data = await prisma.tree.update({
      where: { id: +id },
      data: rest,
    })

    res.json({
      code: 200,
      msg: 'success',
      data,
    })
  })

  app.use('/', router)
}

module.exports = {
  registerTreeController,
}
