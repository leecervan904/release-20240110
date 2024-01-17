const genDefaultTreeData = require('./defaultTreeData')
const genDefaultTableData = require('./defaultTableData')

function buildTree(nodes) {
  const nodeMap = new Map()
  let rootId = null

  for (const node of nodes) {
    const { id, parentId } = node
    const parent = nodeMap.get(parentId)

    if (!nodeMap.has(id)) {
      node.children = []
      nodeMap.set(id, node)
    } else {
      nodeMap.set(id, { ...node, children: nodeMap.get(id).children }) // update empty node
    }

    if (parent) {
      parent.children.push(node)
    } else {
      nodeMap.set(parentId, { children: [node] }) // set empty parent node
    }

    if (parentId === null) {
      rootId = id
    }
  }

  return nodeMap.get(rootId)
}

/**
 * @param {import('@prisma/client').PrismaClient} prisma - Prisma 数据库客户端实例
 */
async function initTreeData(prisma) {
  const { rootNode, subNodes, subSubNodes } = genDefaultTreeData()

  console.log('create: ', subNodes.length);

  // delete all record
  await prisma.tree.deleteMany()

  // create root node
  const createdRootNode = await prisma.tree.create({
    data: rootNode,
  })

  // create sub-node list
  await prisma.tree.createMany({
    data: subNodes.map(v => ({ ...v, parentId: createdRootNode.id })),
  })

  // create sub-sub-node list
  const createdSubNodes = await prisma.tree.findMany({
    where: { parentId: { not: null } }
  })
  const subNodesId = createdSubNodes.map(v => v.id)
  const { floor, random } = Math

  const createdSubSubNodes = await prisma.tree.createMany({
    data: subSubNodes.map(v => ({
      parentId: subNodesId[floor(random() * subNodesId.length)],
      ...v,
    }))
  })

  const nodes = await prisma.tree.findMany({
    include: { children: true }
  })

  return buildTree(nodes)
}

/**
 * @param {import('@prisma/client').PrismaClient} prisma - Prisma 数据库客户端实例
 */
async function initTableData(prisma) {

}

module.exports = {
  buildTree,
  initTreeData,
  initTableData,
}
