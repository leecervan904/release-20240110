import { watch } from "vue";

import { renameTreeData } from "@/api";
import ModalForm from "../components/ModalForm";
import { useModalForm } from "./useModalForm";

export function useTreeNodeRename({ emit, getTreeList, tempNode }) {
  const formConfig = [
    {
      prop: "name",
      label: "目录名称",
      rules: [{ required: true, message: "请输入目录名称", trigger: "blur" }],
      component: {
        type: "Input",
        initialValue: "",
        props: {
          placeholder: "请输入新的目录名称",
        },
      },
    },
  ];

  const { refModal, refForm, visible, loading, confirm, cancel } = useModalForm(
    {
      emit,
      reloadData: true,
      getTreeList,
    }
  );

  const handleConfirm = async () => {
    confirm(({ form }) => {
      return renameTreeData({
        id: tempNode.value.data.id,
        title: form.name,
      });
    });
  };

  const TreeNodeRenameModal = () => (
    <ModalForm
      value={visible.value}
      onInput={(val) => (visible.value = val)}
      title="重命名目录"
      ref="refRenameModal"
      form-config={formConfig}
      loading={loading.value}
      onConfirm={handleConfirm}
      onCancel={cancel}
    />
  );

  // 初始化
  watch(visible, (val) => {
    if (val) {
      console.log(tempNode.value.data);
      refForm.value.setFieldValue("name", tempNode.value.data.title);
    }
  });

  return {
    renameFormConfig: formConfig,
    refRenameModal: refModal,
    renameVisible: visible,
    renameLoading: loading,
    renameConfirm: handleConfirm,
    renameCancel: cancel,
    TreeNodeRenameModal,
  };
}
