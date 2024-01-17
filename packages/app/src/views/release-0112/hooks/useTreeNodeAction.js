import { watch } from "vue";
import { Modal, Message } from "view-design";

import { useModalForm } from "./useModalForm";
import {
  addTreeData,
  deleteTreeData,
  renameTreeData,
  copyTreeData,
  moveTreeData,
} from "@/api";

export function useAddTreeNode({ emit, currentNode, getTreeList }) {
  const formConfig = [
    {
      prop: "name",
      label: "目录名称",
      rules: [{ required: true, message: "请输入目录名称", trigger: "blur" }],
      component: {
        name: "Input",
        initialValue: "",
        props: {
          placeholder: "请输入目录名称",
        },
      },
    },
  ];

  const { refModal, visible, loading, confirm, cancel } = useModalForm({
    emit,
    reloadData: true,
    getTreeList,
  });

  const handleConfirm = async () => {
    confirm(({ form }) => {
      return addTreeData({
        parentId: currentNode.value.data.id,
        title: form.name,
      });
    });
  };

  return {
    addFormConfig: formConfig,
    refAddModal: refModal,
    addVisible: visible,
    addLoading: loading,
    addConfirm: handleConfirm,
    addCancel: cancel,
  };
}

export function useDeleteTreeNode({ emit, getTreeList, tempNode }) {
  const confirm = async () => {
    try {
      const res = await deleteTreeData({
        id: tempNode.value.data.id,
      });
      if (res.data.code === 200) {
        Message.success("新增成功！");
        getTreeList();
        emit("search");
      } else {
        Message.success(res.data.message);
      }
    } catch (error) {
      Message.success(error.message);
    }
  };

  const cancel = () => {
    //
  };

  const showModal = () => {
    Modal.confirm({
      title: "删除目录",
      content: `确认删除目录：${tempNode.value.data.title}`,
      onOk: confirm,
      onCancel: cancel,
    });
  };

  return {
    showDeleteModal: showModal,
  };
}

export function useRenameTreeNode({ emit, getTreeList, tempNode }) {
  const formConfig = [
    {
      prop: "name",
      label: "目录名称",
      rules: [{ required: true, message: "请输入目录名称", trigger: "blur" }],
      component: {
        name: "Input",
        initialValue: "",
        props: {
          placeholder: "请输入新的目录名称",
        },
      },
    },
  ];

  const { refModal, visible, loading, confirm, cancel } = useModalForm({
    emit,
    reloadData: true,
    getTreeList,
  });

  const handleConfirm = async () => {
    confirm(({ form }) => {
      return renameTreeData({
        id: tempNode.value.data.id,
        title: form.name,
      });
    });
  };

  // 初始化
  watch(visible, (val) => {
    if (val) {
      console.log(tempNode.value.data);
      refModal.value.$refs.refSimpleForm.form.name = tempNode.value.data.title;
    }
  });

  return {
    renameFormConfig: formConfig,
    refRenameModal: refModal,
    renameVisible: visible,
    renameLoading: loading,
    renameConfirm: handleConfirm,
    renameCancel: cancel,
  };
}

export function useCopyTreeNode({ emit, getTreeList, tempNode }) {
  const formConfig = [
    {
      prop: "name",
      label: "目录名称",
      rules: [{ required: true, message: "请输入目录名称", trigger: "blur" }],
      component: {
        name: "Input",
        initialValue: "",
        props: {
          placeholder: "请输入目录名称",
        },
      },
    },
  ];

  const { refModal, visible, loading, confirm, cancel } = useModalForm({
    emit,
    reloadData: true,
    getTreeList,
  });

  const handleConfirm = async () => {
    confirm(({ form }) => {
      return copyTreeData({
        name: form.name,
        parentId: tempNode.value.data.id || "0",
      });
    });
  };

  return {
    copyFormConfig: formConfig,
    refCopyModal: refModal,
    copyVisible: visible,
    copyLoading: loading,
    copyConfirm: handleConfirm,
    copyCancel: cancel,
  };
}

export function useMoveTreeNode({ emit, getTreeList, tempNode }) {
  const formConfig = [
    {
      prop: "name",
      label: "目录名称",
      rules: [{ required: true, message: "请输入目录名称", trigger: "blur" }],
      component: {
        name: "Input",
        initialValue: "",
        props: {
          placeholder: "请输入目录名称",
        },
      },
    },
  ];

  const { refModal, visible, loading, confirm, cancel } = useModalForm({
    emit,
    reloadData: true,
    getTreeList,
  });

  const handleConfirm = async () => {
    confirm(({ form }) => {
      return moveTreeData({
        name: form.name,
        parentId: tempNode.value.data.id || "0",
      });
    });
  };

  return {
    moveFormConfig: formConfig,
    refMoveModal: refModal,
    moveVisible: visible,
    moveLoading: loading,
    moveConfirm: handleConfirm,
    moveCancel: cancel,
  };
}
