const Mock = require('mockjs')

module.exports = function genMockData() {
  // mock root node
  const rootNode = {
    title: 'root node',
    content: 'root node content...',
  }

  // mock sub-node list
  const subNodes = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|5-10': [
      {
        'title': /\w{2}\-\d{5,10}/,
        'content': /\w{5,15}/,
      }
    ]
  }).list

  // mock sub-sub-node list
  const subSubNodes = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|30': [
      {
        'title': /\w{2}\-\d{5,10}/,
        'content': /\w{5,15}/,
      }
    ]
  }).list

  return {
    rootNode,
    subNodes,
    subSubNodes,
  }
}
