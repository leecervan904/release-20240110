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

    <ModalForm
      v-model="addVisible"
      title="新建目录"
      ref="refAddModal"
      :form-config="addFormConfig"
      :loading="addLoading"
      @confirm="addConfirm"
      @cancel="addCancel"
    />

    <ModalForm
      v-model="renameVisible"
      title="重命名目录"
      ref="refRenameModal"
      :form-config="renameFormConfig"
      :loading="renameLoading"
      @confirm="renameConfirm"
      @cancel="renameCancel"
    />

    <ModalForm
      v-model="copyVisible"
      title="复制目录"
      ref="refCopyModal"
      :form-config="copyFormConfig"
      :loading="copyLoading"
      @confirm="copyConfirm"
      @cancel="copyCancel"
    />

    <ModalForm
      v-model="moveVisible"
      title="移动目录"
      ref="refMoveModal"
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

import ModalForm from "./ModalForm";
import DirectoryTree from "./DirectoryTree";
import SearchTree from "./SearchTree";

export default {
  name: "LeftTree",
  components: {
    ModalForm,
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
      ...renameTreeNode,
      ...copyTreeNode,
      ...moveTreeNode,
    };
  },
};
</script>
