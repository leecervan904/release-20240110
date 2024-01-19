<template>
  <div>
    <DirectoryTree title="元数据目录">
      <SearchTree
        labelField="name"
        :data="treeData"
        :subText="getSubText"
        :mainText="getMainText"
        label-field="title"
        @node-click="handleNodeClick"
      >
        <template #icon>
          <span>
            <i class="iconfont icon-wenjianjia"></i>
          </span>
        </template>
        <template #action="{ node, data }">
          <Dropdown
            :transfer="true"
            @on-click="(name) => handleSelect(node, data, name)"
          >
            <img
              src="@/assets/common-icon/add-tree.jpg"
              style="width: 10px; height: 10px"
              @click.stop=""
            />
            <template #list>
              <DropdownMenu>
                <DropdownItem name="create"> 新建目录</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
          <Dropdown
            :transfer="true"
            @on-click="(name) => handleSelect(node, data, name)"
          >
            <img
              src="@/assets/common-icon/more-tree.jpg"
              style="width: 10px; height: 3px; margin: 0 5px 3px 10px"
              @click.stop=""
            />
            <template #list>
              <DropdownMenu>
                <DropdownItem name="rename">重命名</DropdownItem>
                <DropdownItem name="delete">删除</DropdownItem>
                <DropdownItem name="copy">复制</DropdownItem>
                <DropdownItem name="move">移动</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        </template>
      </SearchTree>
    </DirectoryTree>

    <TreeNodeAddModal />
    <TreeNodeRenameModal />
    <TreeNodeCopyModal />
    <TreeNodeMoveModal />
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

import { useTree } from "../hooks/useTree";
import { useTreeNodeAdd } from "../hooks/useTreeNodeAdd.jsx";
import { useTreeNodeDelete } from "../hooks/useTreeNodeDelete.jsx";
import { useTreeNodeRename } from "../hooks/useTreeNodeRename.jsx";
import { useTreeNodeCopy } from "../hooks/useTreeNodeCopy.jsx";
import { useTreeNodeMove } from "../hooks/useTreeNodeMove.jsx";

import DirectoryTree from "./DirectoryTree";
import SearchTree from "./SearchTree";

const emit = defineEmits(["search"]);

const {
  currentNode,
  tempNode,
  treeData,
  getTreeList,
  getSubText,
  getMainText,
  handleNodeClick,
} = useTree(emit);

const ctx = {
  emit,
  currentNode,
  tempNode,
  getTreeList,
};

// vue2 缺陷：refAddModal 不能删除，否则不能绑定到模板上
const { addVisible, refAddModal, TreeNodeAddModal } = useTreeNodeAdd(ctx);
const { showDeleteModal } = useTreeNodeDelete(ctx);
const { renameVisible, refRenameModal, TreeNodeRenameModal } =
  useTreeNodeRename(ctx);
const { copyVisible, refCopyModal, TreeNodeCopyModal } = useTreeNodeCopy(ctx);
const { moveVisible, refMoveModal, TreeNodeMoveModal } = useTreeNodeMove(ctx);

const handleSelect = (node, data, action) => {
  console.log(node, data, action);

  if (action === "create") {
    currentNode.value = node;
  } else {
    tempNode.value = node;
  }

  switch (action) {
    case "create":
      addVisible.value = true;
      break;
    case "rename":
      renameVisible.value = true;
      break;
    case "delete":
      showDeleteModal();
      break;
    case "copy":
      copyVisible.value = true;
      break;
    case "move":
      moveVisible.value = true;
      break;
    default:
      break;
  }
};
</script>
