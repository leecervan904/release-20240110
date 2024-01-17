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

    <BaseModalForm
      v-model="addVisible"
      title="新建目录"
      ref="refAddForm"
      :form-config="addFormConfig"
      :loading="addLoading"
      @confirm="addConfirm"
      @cancel="addCancel"
    />

    <!-- <BaseModalForm
      v-model="deleteVisible"
      title="删除目录"
      :loading="deleteLoading"
      @confirm="deleteConfirm"
      @cancel="deleteCancel"
    /> -->

    <BaseModalForm
      v-model="renameVisible"
      title="重命名目录"
      ref="refRenameForm"
      :form-config="renameFormConfig"
      :loading="renameLoading"
      @confirm="renameConfirm"
      @cancel="renameCancel"
    />

    <BaseModalForm
      v-model="copyVisible"
      title="复制目录"
      ref="refCopyForm"
      :form-config="copyFormConfig"
      :loading="copyLoading"
      @confirm="copyConfirm"
      @cancel="copyCancel"
    />

    <BaseModalForm
      v-model="moveVisible"
      title="移动目录"
      ref="refMoveForm"
      :form-config="moveFormConfig"
      :loading="moveLoading"
      @confirm="moveConfirm"
      @cancel="moveCancel"
    />
  </div>
</template>

<script>
import { useTree } from "../hooks/useTree";
import {
  useAddTreeNode,
  useDeleteTreeNode,
  useRenameTreeNode,
  useCopyTreeNode,
  useMoveTreeNode,
} from "../hooks/useTreeNodeAction";

import BaseModalForm from "./BaseModalForm";
import DirectoryTree from "./DirectoryTree";
import SearchTree from "./SearchTree";

export default {
  name: "LeftTree",
  components: {
    BaseModalForm,
    SearchTree,
    DirectoryTree,
  },
  setup(props, { emit }) {
    const {
      currentNode,
      tempNode,
      treeData,
      getTreeList,
      handleNodeClick,
      getSubText,
      getMainText,
    } = useTree(emit);

    const ctx = {
      emit,
      currentNode,
      tempNode,
      getTreeList,
    };

    const addTreeNode = useAddTreeNode(ctx);
    const { showDeleteModal } = useDeleteTreeNode(ctx);
    const renameTreeNode = useRenameTreeNode(ctx);
    const copyTreeNode = useCopyTreeNode(ctx);
    const moveTreeNode = useMoveTreeNode(ctx);

    const handleSelect = (node, data, action) => {
      console.log(node, data, action);

      if (action === "create") {
        currentNode.value = node;
      } else {
        tempNode.value = node;
      }

      switch (action) {
        case "create":
          addTreeNode.addVisible.value = true;
          break;
        case "rename":
          renameTreeNode.renameVisible.value = true;
          break;
        case "delete":
          // deleteTreeNode.deleteVisible.value = true;
          showDeleteModal();
          break;
        case "copy":
          copyTreeNode.copyVisible.value = true;
          break;
        case "move":
          moveTreeNode.moveVisible.value = true;
          break;
        default:
          break;
      }
    };

    return {
      treeData,
      handleNodeClick,
      getMainText,
      getSubText,
      handleSelect,
      ...addTreeNode,
      // ...deleteTreeNode,
      ...renameTreeNode,
      ...copyTreeNode,
      ...moveTreeNode,
    };
  },
};
</script>
