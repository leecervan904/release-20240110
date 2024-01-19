import { ref, onMounted } from "vue";
import { getTreeData } from "@/api";

export function useTree(emit) {
  const currentNode = ref();
  const tempNode = ref();
  const treeData = ref([]);

  async function getTreeList() {
    const params = {
      catalogId: "0",
      createTenancyId: localStorage.tenancyId,
      projectId: localStorage.projectId ? Number(localStorage.projectId) : 222,
    };
    try {
      const res = await getTreeData(params);
      if (res.data.code === 200) {
        const { data } = res.data;
        treeData.value = [data];
        // 默认是选中第一个节点吗 ???
        // 怎么让树调用完接口 默认选中第一个节点 第一个节点高亮???
        currentNode.value = treeData.value[0];
        emit("search");
      } else {
        // Message.error(res.data.message)
      }
    } catch (err) {
      //
    }
  }

  const handleNodeClick = (node) => {
    currentNode.value = node;
    if (currentNode.id) {
      // this.pageInfo = {
      //   page: 1,
      //   pageSize: 10
      // }

      // getTableList();
      emit("search");
    }
  };

  const getMainText = (node) => node.data.title + "-" + node.data.id;
  const getSubText = (data) => `${data.content}`;

  onMounted(() => {
    getTreeList();
  });

  return {
    currentNode,
    tempNode,
    treeData,
    handleNodeClick,
    getTreeList,
    getMainText,
    getSubText,
  };
}
