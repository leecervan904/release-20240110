import { useModalForm } from "./useModalForm";
import {
  addTreeData,
  deleteTreeData,
  renameTreeData,
  copyTreeData,
  moveTreeData,
} from "@/api";

export function useAddTreeNode({ emit, currentNode, getTreeList }) {
  const { refForm, visible, loading, form, rules, confirm, cancel } =
    useModalForm({
      emit,
      reloadData: true,
      getTreeList,
      initForm: {
        name: "",
      },
      rules: {
        name: {
          required: true,
          message: "请输入目录名称",
          trigger: "blur,change",
        },
      },
    });

  const handleConfirm = async () => {
    confirm(() => {
      return addTreeData({
        moduleId: 7,
        name: form.value.name,
        parentId: currentNode.value.data.id || "0",
        createTenancyId: localStorage.tenancyId,
        test1: localStorage.projectId ? Number(localStorage.projectId) : 222,
      });
    });
  };

  return {
    refAddForm: refForm,
    addVisible: visible,
    addLoading: loading,
    addForm: form,
    addRules: rules,
    addConfirm: handleConfirm,
    addCancel: cancel,
  };
}

export function useDeleteTreeNode({ emit, getTreeList, tempNode }) {
  const { visible, loading, confirm, cancel } = useModalForm({
    emit,
    reloadData: true,
    getTreeList,
  });

  const handleConfirm = async () => {
    confirm(() => {
      return deleteTreeData({
        catelogId: tempNode.value.data.id,
      });
    });
  };

  return {
    deleteVisible: visible,
    deleteLoading: loading,
    deleteConfirm: handleConfirm,
    deleteCancel: cancel,
  };
}

export function useRenameTreeNode({ emit, getTreeList, tempNode }) {
  const { refForm, visible, loading, form, rules, confirm, cancel } =
    useModalForm({
      emit,
      reloadData: true,
      getTreeList,
      initForm: {
        name: "",
      },
      rules: {
        name: {
          required: true,
          message: "请输入新的目录名称",
          trigger: "blur,change",
        },
      },
    });

  const handleConfirm = async () => {
    confirm(() => {
      return renameTreeData({
        moduleId: 7,
        name: form.value.name,
        parentId: tempNode.value.data.id || "0",
        createTenancyId: localStorage.tenancyId,
        test1: localStorage.projectId ? Number(localStorage.projectId) : 222,
      });
    });
  };

  return {
    refRenameForm: refForm,
    renameVisible: visible,
    renameLoading: loading,
    renameForm: form,
    renameRules: rules,
    renameConfirm: handleConfirm,
    renameCancel: cancel,
  };
}

export function useCopyTreeNode({ emit, getTreeList, tempNode }) {
  const { refForm, visible, loading, form, rules, confirm, cancel } =
    useModalForm({
      emit,
      reloadData: true,
      getTreeList,
      initForm: {
        name: "",
      },
      rules: {
        name: {
          required: true,
          message: "请输入新的目录名称",
          trigger: "blur,change",
        },
      },
    });

  const handleConfirm = async () => {
    confirm(() => {
      return copyTreeData({
        moduleId: 7,
        name: form.value.name,
        parentId: tempNode.value.data.id || "0",
        createTenancyId: localStorage.tenancyId,
        test1: localStorage.projectId ? Number(localStorage.projectId) : 222,
      });
    });
  };

  return {
    refCopyForm: refForm,
    copyVisible: visible,
    copyLoading: loading,
    copyForm: form,
    copyRules: rules,
    copyConfirm: handleConfirm,
    copyCancel: cancel,
  };
}

export function useMoveTreeNode({ emit, getTreeList, tempNode }) {
  const { refForm, visible, loading, form, rules, confirm, cancel } =
    useModalForm({
      emit,
      reloadData: true,
      getTreeList,
      initForm: {
        name: "",
      },
      rules: {
        name: {
          required: true,
          message: "请输入新的目录名称",
          trigger: "blur,change",
        },
      },
    });

  const handleConfirm = async () => {
    confirm(() => {
      return moveTreeData({
        moduleId: 7,
        name: form.value.name,
        parentId: tempNode.value.data.id || "0",
        createTenancyId: localStorage.tenancyId,
        test1: localStorage.projectId ? Number(localStorage.projectId) : 222,
      });
    });
  };

  return {
    refMoveForm: refForm,
    moveVisible: visible,
    moveLoading: loading,
    moveForm: form,
    moveRules: rules,
    moveConfirm: handleConfirm,
    moveCancel: cancel,
  };
}
